import type { MetadataRoute } from 'next';

const BASE = 'https://www.cleankrd23.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Услуги — высокий приоритет
    {
      url: `${BASE}/regularcleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/postholidaycleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/postrenovationcleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/furniturecleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/windowcleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/commercialcleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/firedamagecleaning`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/ozonation`,
      lastModified: '2026-05-26',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Новости — обновляются часто
    {
      url: `${BASE}/news`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    // Прочие
    {
      url: `${BASE}/privacy`,
      lastModified: '2026-05-26',
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
