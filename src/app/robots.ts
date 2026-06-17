import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/privacy', '/*?utm_*', '/*?fbclid=*', '/*?gclid=*', '/*?yclid=*'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/privacy'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/privacy'],
      },
    ],
    sitemap: 'https://www.cleankrd23.ru/sitemap.xml',
    host: 'https://www.cleankrd23.ru',
  };
}
