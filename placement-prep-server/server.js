import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import fs from 'fs';
import { fetchGitHubData } from './services/githubService.js';
import { generateResumeWithGemini } from './services/geminiService.js';
import PDFDocument from 'pdfkit';
import stream from 'stream';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors("*"));
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is required');
  process.exit(1);
}

// Route to generate PDF resume
app.post('/generate-resume/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Invalid GitHub username format' });
    }

    console.log(`Generating resume for GitHub user: ${username}`);

    // Step 1: Fetch GitHub data
    const githubData = await fetchGitHubData(username);

    // Step 2: Generate resume text using Gemini
    const resumeText = await generateResumeWithGemini(githubData);

    // Step 3: Create PDF using PDFKit
    const doc = new PDFDocument();
    const bufferStream = new stream.PassThrough();

    // Pipe the PDF output to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${username}-resume.pdf`);
    doc.pipe(bufferStream);

    // Title
    doc.fontSize(20).text(`${username}'s Resume`, { align: 'center' });
    doc.moveDown();

    // Resume body (supports multiline)
    doc.fontSize(12).text(resumeText, {
      align: 'left',
      lineGap: 4,
    });

    doc.end();

    // Stream the PDF to the client
    bufferStream.pipe(res);

    console.log(`Resume PDF sent successfully for ${username}`);
  } catch (error) {
    console.error('Error generating resume:', error.message);

    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    } else if (error.message.includes('rate limit')) {
      return res.status(429).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
    } else if (error.message.includes('Gemini')) {
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    } else {
      return res.status(500).json({ error: 'Internal server error occurred' });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'GitHub Resume Generator'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Resume endpoint: GET http://localhost:${PORT}/generate-resume/:username`);
  console.log(`💡 Example: http://localhost:${PORT}/generate-resume/octocat`);
});

export default app;
