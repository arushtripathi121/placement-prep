import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildResumePrompt } from '../prompt/resumePromptBuilder.js';
import dotenv from 'dotenv';

dotenv.config();
// Initialize Gemini AI
console.log("this is the gemini api key",process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateResumeWithGemini(githubData) {
               try {
                              // Build the prompt using the dedicated prompt builder
                              const prompt = buildResumePrompt(githubData);

                              console.log('Sending request to Gemini Flash...');

                              // Generate content using Gemini Flash
                              const result = await model.generateContent(prompt);
                              const response = await result.response;
                              const resumeText = response.text();

                              if (!resumeText || resumeText.trim().length === 0) {
                                             throw new Error('Gemini returned empty response');
                              }

                              return resumeText.trim();

               } catch (error) {
                              console.error('Gemini API error:', error);

                              if (error.message.includes('API key')) {
                                             throw new Error('Gemini API key is invalid or expired');
                              } else if (error.message.includes('quota')) {
                                             throw new Error('Gemini API quota exceeded');
                              } else if (error.message.includes('blocked')) {
                                             throw new Error('Gemini blocked the request due to safety concerns');
                              }

                              throw new Error(`Gemini service error: ${error.message}`);
               }
}