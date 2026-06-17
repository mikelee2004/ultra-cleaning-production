import type { Metadata } from 'next';
import NewsPage from '@/components/pages/NewsPage';
import type { TelegramPost } from '@/types/vk';

export const metadata: Metadata = {
  title: 'Новости клининговой компании Ультра Клининг в Краснодаре',
  description:
    'Последние новости, советы по уборке и акции от клининговой компании Ультра Клининг в Краснодаре. Подписывайтесь на наш Telegram-канал.',
  keywords: 'новости клининг Краснодар, советы по уборке, акции клининг',
  alternates: { canonical: 'https://www.cleankrd23.ru/news' },
  openGraph: {
    url: 'https://www.cleankrd23.ru/news',
    type: 'website',
    title: 'Новости Ультра Клининг — советы по уборке и акции',
    description: 'Последние новости, советы по уборке и акции от клининговой компании Ультра Клининг в Краснодаре.',
  },
};

// ISR: ревалидация каждые 5 минут
export const revalidate = 300;

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://www.cleankrd23.ru/' },
    { '@type': 'ListItem', position: 2, name: 'Новости', item: 'https://www.cleankrd23.ru/news' },
  ],
};

async function getTelegramPosts(): Promise<{ posts: TelegramPost[]; total: number }> {
  const workerUrl = process.env.TELEGRAM_WORKER_URL || 'https://ultraclining-telegram-api.mike-lee-software-2004.workers.dev';
  
  try {
    const res = await fetch(`${workerUrl}/api/telegram-posts?limit=100`, {
      next: { revalidate: 300 },
    });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    return {
      posts: Array.isArray(data?.posts) ? data.posts : [],
      total: data?.total ?? 0,
    };
  } catch (error) {
    console.error('Error fetching Telegram posts:', error);
    return { posts: [], total: 0 };
  }
}

export default async function NewsRoute() {
  const { posts } = await getTelegramPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewsPage posts={posts} />
    </>
  );
}
