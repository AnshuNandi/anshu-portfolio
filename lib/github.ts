export async function getGithubStats() {
  const gistId = process.env.GIST_ID;
  const gistToken = process.env.GITHUB_TOKEN; // Optional: If the gist is secret, we need a token to read it. If public, no token needed. Usually a secret gist needs authentication if we use the API, but raw.githubusercontent is easier.

  // To fetch from a secret gist, we use the GitHub API to get the raw URL of the file.
  if (gistId) {
    try {
      const res = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: gistToken ? { Authorization: `Bearer ${gistToken}` } : {},
        // Apply ISR cache tag so this can be revalidated on-demand by our webhook
        next: { tags: ['github-stats'], revalidate: 86400 } // Revalidate daily fallback
      });

      if (res.ok) {
        const gist = await res.json();
        const file = gist.files['github-stats.json'];
        
        if (file && file.content) {
          const stats = JSON.parse(file.content);
          return stats;
        }
      }
    } catch (e) {
      console.error('Failed to fetch stats from Gist:', e);
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
