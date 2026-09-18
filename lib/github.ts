export async function getGithubStats() {
  const gistId = process.env.GIST_ID;
  const gistToken = process.env.GITHUB_TOKEN; // Read-Only Fine-Grained Token

  if (gistId) {
    try {
      const res = await fetch(`https://api.github.com/gists/${gistId}`, {
        // Authenticated request guarantees fresh data and 5,000 req/hr limits
        headers: gistToken ? { Authorization: `Bearer ${gistToken}` } : {},
        // Standard Next.js ISR caching
        next: { tags: ['github-stats'], revalidate: 86400 } 
      });

      if (res.ok) {
        const gist = await res.json();
        const file = gist.files['github-stats.json'];
        
        if (file && file.content) {
          return JSON.parse(file.content);
        }
      }
    } catch (e) {
      console.error('Failed to fetch stats from GitHub API:', e);
    }
  }

  // Fallback if gist is not set or fails
  return {
    totalRepos: 25,
    langs: null,
    totalContributions: null,
    totalCommits: null,
    prPercentage: null,
    commitPercentage: null,
    weeks: null,
    repos: null
  };
}
