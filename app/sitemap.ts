import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  };
  const baseUrl = getBaseUrl();
  
  return [
    {
      url: baseUrl,
      lastModified: new Date('2024-01-01'), // Use a static date or omit, never use dynamic new Date() on every request
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add more routes here if your portfolio expands to multiple pages
  ]
}
