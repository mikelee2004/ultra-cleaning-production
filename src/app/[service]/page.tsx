import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceData } from '@/lib/serviceData';
import ServicePage from '@/components/pages/ServicePage';
import PostRenovationPage from '@/components/pages/PostRenovationPage';
import OzonationPage from '@/components/pages/OzonationPage';

const BASE = 'https://www.cleankrd23.ru';

// Услуги с универсальным шаблоном
const SERVICE_SLUGS = Object.keys(serviceData).filter(s => s !== 'postrenovationcleaning');

export async function generateStaticParams() {
  return [...SERVICE_SLUGS, 'postrenovationcleaning', 'ozonation', 'postholidaycleaning'].map(service => ({ service }));
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function breadcrumb(name: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name, item: `${BASE}/${slug}` },
    ],
  };
}

function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function serviceSchema(name: string, desc: string, slug: string, price: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: desc,
    url: `${BASE}/${slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ультра Клининг',
      '@id': `${BASE}/#business`,
    },
    areaServed: { '@type': 'City', name: 'Краснодар' },
    offers: {
      '@type': 'Offer',
      price: price.replace(/[^\d]/g, '') || '0',
      priceCurrency: 'RUB',
    },
  };
}

/* ── SEO данные для специальных страниц ───────────────────────────────────── */
const SPECIAL_SEO: Record<string, {
  metadata: Metadata;
  schemas: object[];
}> = {
  ozonation: {
    metadata: {
      title: 'Озонирование помещений в Краснодаре — устраним любой запах | Ультра Клининг',
      description: 'Профессиональное озонирование квартир, домов и автомобилей в Краснодаре. Устраняем запах гари, табака, животных, плесени. Без химии, безопасно. От 70 ₽/м². Звоните: +7 (918) 991-36-32',
      keywords: 'озонирование Краснодар, озонирование помещений, устранение запахов, дезинфекция озоном, озонатор Краснодар',
      alternates: { canonical: `${BASE}/ozonation` },
      openGraph: { url: `${BASE}/ozonation` },
    },
    schemas: [
      breadcrumb('Озонирование помещений', 'ozonation'),
      faqSchema([
        { q: 'Нужно ли уходить из квартиры во время озонирования?', a: 'Да, обязательно. Во время работы озонатора в помещении не должно быть людей, животных и растений. После завершения — проветриваем 1–2 часа, затем можно заходить.' },
        { q: 'Озонирование действительно убивает запах или только маскирует?', a: 'Убивает. Озон окисляет молекулы запаха на химическом уровне — они разрушаются, а не перебиваются другим ароматом.' },
        { q: 'Поможет ли озонирование от запаха кошки?', a: 'Да, это один из самых частых запросов. Озон нейтрализует аммиак и другие компоненты кошачьей мочи.' },
        { q: 'Как долго держится эффект?', a: 'Эффект постоянный — запах не возвращается, если устранён его источник.' },
        { q: 'Можно ли озонировать автомобиль?', a: 'Да, это очень популярная услуга. Убираем запах табака, животных, сырости и плесени из салона. Занимает 30–60 минут.' },
      ]),
      serviceSchema('Озонирование помещений', 'Промышленный озонатор уничтожает запахи, бактерии и вирусы на молекулярном уровне. Без химии, без маскировки — только чистый воздух.', 'ozonation', '70'),
    ],
  },
  postrenovationcleaning: {
    metadata: {
      title: 'Уборка после ремонта в Краснодаре — от 200 ₽/м² | Ультра Клининг',
      description: 'Профессиональная уборка после ремонта в Краснодаре. Удаляем строительную пыль, следы краски, цемент. Промышленное оборудование Karcher. Гарантия 24 часа. Звоните: +7 (918) 991-36-32',
      keywords: 'уборка после ремонта Краснодар, уборка после ремонта, строительная пыль, клининг после ремонта',
      alternates: { canonical: `${BASE}/postrenovationcleaning` },
      openGraph: { url: `${BASE}/postrenovationcleaning` },
    },
    schemas: [
      breadcrumb('Уборка после ремонта', 'postrenovationcleaning'),
      faqSchema([
        { q: 'Когда лучше заказывать уборку после ремонта?', a: 'Когда все строительные и монтажные работы полностью завершены. Строительная пыль оседает ещё 2–3 дня после окончания работ — лучше подождать.' },
        { q: 'Входит ли мытьё окон в стоимость?', a: 'Да, мытьё окон после ремонта входит в стандартный пакет. Удаляем наклейки, цемент, монтажную пену и следы краски.' },
        { q: 'Как вы удаляете строительную пыль?', a: 'Используем промышленные пылесосы Karcher с HEPA-фильтрами и влажную уборку в несколько этапов с частой сменой воды.' },
        { q: 'Справитесь ли вы со следами затирки на плитке?', a: 'Да, используем специальные кислотные очистители, которые растворяют цементную затирку, не повреждая саму плитку и швы.' },
        { q: 'Сколько времени занимает уборка?', a: '1-комнатная квартира — 4–6 часов, 2-комнатная — 6–8 часов, 3-комнатная — 8–12 часов. Работает бригада из 2–3 человек.' },
      ]),
      serviceSchema('Уборка после ремонта', 'Удаляем строительную пыль, следы краски, цемент на плитке. Промышленное оборудование и специальная химия.', 'postrenovationcleaning', '200'),
    ],
  },
};

/* ── generateMetadata ─────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;

  if (SPECIAL_SEO[service]) return SPECIAL_SEO[service].metadata;

  const data = serviceData[service];
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: `${data.title.toLowerCase()}, ${data.title.toLowerCase()} Краснодар, клининг Краснодар`,
    alternates: { canonical: data.canonical },
    openGraph: { url: data.canonical, title: data.metaTitle, description: data.metaDescription },
  };
}

/* ── Page component ───────────────────────────────────────────────────────── */
export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;

  // Специальные страницы с кастомными Schema.org
  if (service === 'ozonation') {
    return (
      <>
        {SPECIAL_SEO.ozonation.schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <OzonationPage />
      </>
    );
  }

  if (service === 'postrenovationcleaning') {
    return (
      <>
        {SPECIAL_SEO.postrenovationcleaning.schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <PostRenovationPage />
      </>
    );
  }

  const data = serviceData[service];
  if (!data) notFound();

  // Универсальные страницы услуг — Schema.org генерируется из serviceData
  const schemas = [
    breadcrumb(data.title, service),
    faqSchema(data.faqs),
    serviceSchema(data.title, data.desc, service, data.price),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ServicePage slug={service} />
    </>
  );
}
