import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// GitHub authentication headers
function getGitHubHeaders() {
               const headers = {
                              'Accept': 'application/vnd.github.v3+json',
                              'User-Agent': 'GitHub-Resume-Generator'
               };

               // Add authentication if token is available
               if (process.env.GITHUB_TOKEN) {
                              headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
               }

               return headers;
}

// Helper function to get total commit count from a repository
async function getCommitCount(owner, repo) {
               try {
                              const response = await axios.get(
                                             `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=1`,
                                             {
                                                            headers: getGitHubHeaders()
                                             }
                              );

                              // Check if there's a Link header with pagination info
                              const linkHeader = response.headers.link;
                              if (linkHeader) {
                                             // Parse the Link header to find the last page
                                             const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
                                             if (lastPageMatch) {
                                                            return parseInt(lastPageMatch[1], 10);
                                             }
                              }

                              // If no pagination, there's likely only one page of commits
                              return response.data.length;
               } catch (error) {
                              console.warn(`Failed to get commit count for ${owner}/${repo}:`, error.message);
                              return 0;
               }
}

// Helper function to get programming languages used in repositories
function extractLanguages(repositories) {
               const languages = new Set();
               repositories.forEach(repo => {
                              if (repo.language) {
                                             languages.add(repo.language);
                              }
               });
               return Array.from(languages);
}

// Main function to fetch GitHub data
export async function fetchGitHubData(username) {
               try {
                              console.log(`Fetching profile for ${username}...`);

                              // Fetch user profile
                              const userResponse = await axios.get(`${GITHUB_API_BASE}/users/${username}`, {
                                             headers: getGitHubHeaders()
                              });

                              const user = userResponse.data;

                              console.log(`Fetching repositories for ${username}...`);

                              // Fetch all public repositories
                              const reposResponse = await axios.get(
                                             `${GITHUB_API_BASE}/users/${username}/repos?type=public&sort=updated&per_page=100`,
                                             {
                                                            headers: getGitHubHeaders()
                                             }
                              );

                              const repositories = reposResponse.data;

                              // Filter out forked repositories and empty repositories
                              const ownRepositories = repositories.filter(repo => !repo.fork && repo.size > 0);

                              if (ownRepositories.length === 0) {
                                             console.log(`No original repositories found for ${username}`);
                                             return {
                                                            user,
                                                            topRepositories: [],
                                                            languages: []
                                             };
                              }

                              // Limit to top 10 repositories by stars/forks to reduce API calls
                              const topReposByActivity = ownRepositories
                                             .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
                                             .slice(0, 10);

                              console.log(`Getting commit counts for ${topReposByActivity.length} repositories...`);

                              // Get commit counts for each repository
                              const reposWithCommits = await Promise.all(
                                             topReposByActivity.map(async (repo) => {
                                                            const commitCount = await getCommitCount(username, repo.name);
                                                            return {
                                                                           ...repo,
                                                                           commit_count: commitCount
                                                            };
                                             })
                              );

                              // Sort repositories by commit count (descending) and take top 2
                              const topRepositories = reposWithCommits
                                             .sort((a, b) => b.commit_count - a.commit_count)
                                             .slice(0, 2);

                              console.log(`Top repositories by commits:`, topRepositories.map(r => `${r.name} (${r.commit_count} commits)`));

                              // Extract programming languages from all repositories
                              const languages = extractLanguages(ownRepositories);

                              return {
                                             user,
                                             topRepositories,
                                             languages
                              };

               } catch (error) {
                              if (error.response && error.response.status === 404) {
                                             throw new Error(`GitHub user '${username}' not found`);
                              } else if (error.response && error.response.status === 403) {
                                             throw new Error('GitHub API rate limit exceeded');
                              }
                              throw new Error(`Failed to fetch GitHub data: ${error.message}`);
               }
}