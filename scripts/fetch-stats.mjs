const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIST_ID = process.env.GIST_ID;

if (!GITHUB_TOKEN || !GIST_ID) {
  console.error("Missing GITHUB_TOKEN or GIST_ID environment variables.");
  process.exit(1);
}

const query = `
  query {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      pullRequests {
        totalCount
      }
      issues {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100, privacy: PUBLIC) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          homepageUrl
          isPrivate
          updatedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      privateRepos: repositories(ownerAffiliations: OWNER, isFork: false, first: 100, privacy: PRIVATE) {
        nodes {
          name
          description
          url
          stargazerCount
          homepageUrl
          isPrivate
          updatedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

async function run() {
  console.log("Fetching GitHub stats...");
  
  try {
    // 1. Fetch data from GitHub GraphQL API
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`GitHub GraphQL API error: ${res.statusText}`);
    }

    const json = await res.json();
    const viewer = json.data?.viewer;

    if (!viewer) {
      throw new Error("Invalid response structure from GitHub API.");
    }

    // 2. Process data
    const totalContributions = viewer.contributionsCollection.contributionCalendar.totalContributions;
    const weeks = viewer.contributionsCollection.contributionCalendar.weeks;
    const totalRepos = viewer.repositories.totalCount;
    const prs = viewer.pullRequests.totalCount;
    const issues = viewer.issues.totalCount;
    
    let prPercentage = 0;
    if (prs + issues > 0) {
      prPercentage = Math.round((prs / (prs + issues)) * 100);
    }

    const langCounts = {};
    let totalSize = 0;
    
    const allRepos = [...viewer.repositories.nodes, ...(viewer.privateRepos?.nodes || [])];
    
    allRepos.forEach((repo) => {
      repo.languages?.edges?.forEach((edge) => {
        const name = edge.node.name;
        const size = edge.size;
        const color = edge.node.color;
        
        if (!langCounts[name]) {
          langCounts[name] = { size: 0, color: color || '#888' };
        }
        langCounts[name].size += size;
        totalSize += size;
      });
    });

    const sortedLangs = Object.entries(langCounts)
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, 4);
      
    const langs = sortedLangs.map(([name, data]) => ({
      name,
      pct: Math.round((data.size / totalSize) * 100),
      color: name === 'Python' ? 'bg-goog-blue' : name.includes('TypeScript') || name.includes('JavaScript') ? 'bg-goog-yellow' : name.includes('Jupyter') ? 'bg-goog-red' : 'bg-goog-green',
    }));

    // Format repos for the frontend
    const repos = allRepos.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      homepageUrl: repo.homepageUrl,
      stargazers: repo.stargazerCount,
      isPrivate: repo.isPrivate,
      updatedAt: repo.updatedAt,
      language: repo.primaryLanguage?.name || 'Unknown',
      languageColor: repo.primaryLanguage?.color || '#888'
    })).sort((a, b) => {
      // Sort by stars first, then by recency
      if (b.stargazers !== a.stargazers) {
        return b.stargazers - a.stargazers;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }).slice(0, 12); // Top 12 projects

    const finalData = {
      totalRepos,
      langs,
      totalContributions,
      prPercentage,
      weeks,
      repos,
      lastUpdated: new Date().toISOString()
    };

    console.log("Stats fetched and processed successfully.");

    // 3. Update the GitHub Gist
    console.log(`Updating Gist: ${GIST_ID}...`);
    
    const gistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        files: {
          'github-stats.json': {
            content: JSON.stringify(finalData, null, 2)
          }
        }
      })
    });

    if (!gistRes.ok) {
      throw new Error(`Failed to update Gist: ${gistRes.statusText}`);
    }

    console.log("Gist updated successfully!");

  } catch (error) {
    console.error("Error during stats update process:", error);
    process.exit(1);
  }
}

run();
