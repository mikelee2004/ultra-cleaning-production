import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'Ультра Клининг — Профессиональная уборка в Краснодаре | 24/7',
  description:
    'Клининговая компания в Краснодаре. Уборка после праздника, уборка после ремонта, химчистка мебели, мытьё окон, озонирование. Работаем 24/7, эко-химия, гарантия результата. Звоните: +7 (918) 991-36-32',
  alternates: {
    canonical: 'https://www.cleankrd23.ru/',
    languages: { ru: 'https://www.cleankrd23.ru/', 'x-default': 'https://www.cleankrd23.ru/' },
  },
  openGraph: { url: 'https://www.cleankrd23.ru/' },
};

// BreadcrumbList для главной
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://www.cleankrd23.ru/' }],
};

export default function HomeRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HomePage />
    </>
  );
}
