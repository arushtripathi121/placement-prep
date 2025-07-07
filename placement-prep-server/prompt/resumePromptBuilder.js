export function buildResumePrompt({ user, topRepositories, languages }) {
               // Build the data sections for the prompt
               const profileSection = buildProfileSection(user);
               const repositoriesSection = buildRepositoriesSection(topRepositories);
               const languagesSection = buildLanguagesSection(languages);

               return `You are a professional resume writer. Create a one-page, ATS-friendly resume in plain text format for a software engineer based on their GitHub profile and most active repositories.
             
             ${profileSection}
             
             ${repositoriesSection}
             
             ${languagesSection}
             
             INSTRUCTIONS:
             1. Create a clean, professional resume in plain text format (NO markdown, NO HTML)
             2. Use a two-column layout with proper spacing and alignment
             3. Left column: Contact information, Technical Skills, GitHub Statistics
             4. Right column: Professional Summary, Top 2 Projects
             5. If any information is missing, omit that section entirely (NO placeholders)
             6. Use clean visual spacing with dashes, equals signs, and pipes for formatting
             7. Keep it to one page when printed
             8. Make it ATS-friendly and professional
             
             FORMAT REQUIREMENTS:
             - Use proper spacing and alignment
             - Use ASCII characters for visual separation (=, -, |)
             - Keep lines under 80 characters
             - Use consistent formatting throughout
             - Make it look polished and professional
             
             SECTIONS TO INCLUDE (only if data exists):
             LEFT COLUMN:
             - Contact Information (name, email, location, GitHub URL)
             - Technical Skills (programming languages from repositories)
             - GitHub Statistics (followers, following, public repos)
             
             RIGHT COLUMN:
             - Professional Summary (based on bio and repository activity)
             - Top 2 Projects (repository name, description, tech stack, commit count, URL)
             
             Generate the resume now:`;
}

function buildProfileSection(user) {
               let section = "GITHUB PROFILE DATA:\n";

               if (user.name) section += `Name: ${user.name}\n`;
               if (user.email) section += `Email: ${user.email}\n`;
               if (user.location) section += `Location: ${user.location}\n`;
               if (user.bio) section += `Bio: ${user.bio}\n`;
               if (user.html_url) section += `GitHub URL: ${user.html_url}\n`;
               if (user.followers !== undefined) section += `Followers: ${user.followers}\n`;
               if (user.following !== undefined) section += `Following: ${user.following}\n`;
               if (user.public_repos !== undefined) section += `Public Repositories: ${user.public_repos}\n`;

               return section;
}

function buildRepositoriesSection(topRepositories) {
               let section = "TOP 2 MOST ACTIVE REPOSITORIES:\n";

               if (topRepositories.length === 0) {
                              section += "No repositories found\n";
                              return section;
               }

               topRepositories.forEach((repo, index) => {
                              section += `\n${index + 1}. ${repo.name}\n`;
                              if (repo.description) section += `   Description: ${repo.description}\n`;
                              if (repo.language) section += `   Primary Language: ${repo.language}\n`;
                              if (repo.commit_count) section += `   Commit Count: ${repo.commit_count}\n`;
                              if (repo.stargazers_count) section += `   Stars: ${repo.stargazers_count}\n`;
                              if (repo.forks_count) section += `   Forks: ${repo.forks_count}\n`;
                              if (repo.html_url) section += `   URL: ${repo.html_url}\n`;
               });

               return section;
}

function buildLanguagesSection(languages) {
               let section = "PROGRAMMING LANGUAGES USED:\n";

               if (languages.length === 0) {
                              section += "No languages detected\n";
               } else {
                              section += languages.join(", ") + "\n";
               }

               return section;
}