export async function getGithubStats() {
  const gistId = process.env.GIST_ID;

  if (gistId) {
    try {
      // Fetching from the raw CDN avoids the aggressive 60 req/hr GitHub API rate limits.
      // It also requires zero secrets or tokens on the Vercel edge!
      const res = await fetch(`https://gist.githubusercontent.com/raw/${gistId}/github-stats.json`, {
        // Apply ISR cache tag so this can be revalidated on-demand by our webhook
        next: { tags: ['github-stats'], revalidate: 86400 } // Revalidate daily fallback
      });

      if (res.ok) {
        const stats = await res.json();
        return stats;
      }
    } catch (e) {
      console.error('Failed to fetch stats from Gist CDN:', e);
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
