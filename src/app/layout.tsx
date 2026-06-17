import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { contacts } from '@/lib/contacts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import YandexMetrika from '@/components/YandexMetrika';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Ультра Клининг — Профессиональная уборка в Краснодаре | Круглосуточно',
    template: '%s | Ультра Клининг',
  },
  description:
    'Профессиональная клининговая компания в Краснодаре. Генеральная уборка, уборка после ремонта, химчистка мебели, мытьё окон. Работаем 24/7. Эко-химия, гарантия результата.',
  keywords:
    'клининг Краснодар, уборка квартир, уборка после праздника, уборка после ремонта, химчистка мебели, мытьё окон, клининговая компания, озонирование Краснодар, уборка после пожара, коммерческая уборка',
  authors: [{ name: 'Ультра Клининг' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon-32x32.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Ультра Клининг',
    title: 'Ультра Клининг — Профессиональная уборка в Краснодаре',
    description:
      'Профессиональная клининговая компания в Краснодаре. Работаем 24/7, используем эко-химию, даём гарантию результата.',
    url: 'https://www.cleankrd23.ru/',
    images: [{ url: 'https://www.cleankrd23.ru/og-image.png', width: 1200, height: 630, alt: 'Ультра Клининг' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ультра Клининг — Профессиональная уборка в Краснодаре',
    description: 'Профессиональная клининговая компания в Краснодаре. Работаем 24/7, используем эко-химию.',
    images: ['https://www.cleankrd23.ru/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.cleankrd23.ru/',
    languages: { ru: 'https://www.cleankrd23.ru/' },
  },
  other: {
    'geo.region': 'RU-KDA',
    'geo.placename': 'Краснодар',
    'geo.position': '45.0355;38.9753',
    ICBM: '45.0355, 38.9753',
    'format-detection': 'telephone=no',
    referrer: 'strict-origin-when-cross-origin',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'CleaningService',
  '@id': 'https://www.cleankrd23.ru/#business',
  name: 'Ультра Клининг',
  alternateName: 'UltraClining',
  description:
    'Профессиональная клининговая компания в Краснодаре. Генеральная уборка, уборка после ремонта, химчистка мебели, мытьё окон, озонирование. Работаем круглосуточно.',
  url: 'https://www.cleankrd23.ru',
  logo: 'https://www.cleankrd23.ru/ultra-cleaning-logo.svg',
  image: 'https://www.cleankrd23.ru/og-image.png',
  telephone: contacts.phone,
  email: contacts.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Северная, 320',
    addressLocality: 'Краснодар',
    addressRegion: 'Краснодарский край',
    postalCode: '350000',
    addressCountry: 'RU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '45.0355', longitude: '38.9753' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  priceRange: '₽₽',
  currenciesAccepted: 'RUB',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: { '@type': 'City', name: 'Краснодар' },
  sameAs: [contacts.vk, contacts.telegram],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: contacts.ratingValue,
    bestRating: '5',
    worstRating: '1',
    reviewCount: String(contacts.reviewCount),
    ratingCount: String(contacts.reviewCount),
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.cleankrd23.ru/#website',
  name: 'Ультра Клининг',
  url: 'https://www.cleankrd23.ru',
  inLanguage: 'ru-RU',
  publisher: { '@id': 'https://www.cleankrd23.ru/#business' },
};

const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { author: 'Екатерина Земляная', text: 'После ремонта встал вопрос уборки. Приехали две девочки — Галина и Виктория. Результат превзошёл все ожидания, квартира засияла!', rating: 5 },
    { author: 'Александр Донской', text: 'Очень качественный сервис, рекомендую. Просите мастера Галину — таких специалистов осталось мало. Менеджер Ангелина — это двигатель фирмы!', rating: 5 },
    { author: 'Никита Кондратюк', text: 'Ценю своё время и чёткость. Заказал уборку через сайт, быстро перезвонили, уточнили детали. Бригада приехала ровно в назначенный час.', rating: 5 },
    { author: 'Дарья Летягина', text: 'Регулярно пользуемся услугами этой компании. Недавно заехали в новую квартиру — результат впечатлил даже мужа. Окна в идеале!', rating: 5 },
  ].map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5', worstRating: '1' },
      itemReviewed: { '@type': 'LocalBusiness', name: 'Ультра Клининг', '@id': 'https://www.cleankrd23.ru/#business' },
    },
  })),
};

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Ультра Клининг — клининговая компания в Краснодаре',
  description: 'Презентация клининговой компании Ультра Клининг: уборка после праздника, уборка после ремонта, химчистка мебели и мытьё окон в Краснодаре.',
  thumbnailUrl: ['https://www.cleankrd23.ru/og-image.png'],
  uploadDate: '2026-05-20',
  contentUrl: 'https://www.cleankrd23.ru/hero.mp4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#A70000" />
        <meta name="color-scheme" content="light" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
        {/* Yandex.Metrika — через next/script, не в <head> */}
      </head>
      <body className="font-[family-name:var(--font-inter)] text-[#1C2B3A] overflow-x-hidden">
        <YandexMetrika />
        <noscript>
          <div className="p-6 text-center font-sans">
            <h1>Ультра Клининг — клининговая компания в Краснодаре</h1>
            <p>Для корректной работы сайта необходимо включить JavaScript.</p>
            <p>Или позвоните нам: <a href={`tel:${contacts.phone}`}>{contacts.phoneFormatted}</a></p>
          </div>
        </noscript>

        {/* Skip link для доступности */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#A70000] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold focus:text-sm focus:no-underline"
        >
          Перейти к содержимому
        </a>

        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'var(--font-inter), sans-serif' },
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
