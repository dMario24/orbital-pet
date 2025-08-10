import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://orbital-pet.vercel.app' // TODO: 프로덕션 URL로 변경해주세요.

  // 정적 라우트를 여기에 추가합니다.
  // 동적 라우트(예: 블로그 게시물)는 데이터를 가져와서 생성해야 합니다.
  const staticRoutes = [
    '/',
    '/login',
    '/milestone',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}
