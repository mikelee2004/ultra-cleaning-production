import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '6', 10), 100);

  const workerUrl = process.env.TELEGRAM_WORKER_URL || 'https://ultraclining-telegram-api.mike-lee-software-2004.workers.dev';

  try {
    const response = await fetch(`${workerUrl}/api/telegram-posts?limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // кэш на 5 минут
    });

    if (!response.ok) {
      throw new Error(`Worker returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching Telegram posts:', error);
    return NextResponse.json(
      { posts: [], total: 0 },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=60',
        },
      }
    );
  }
}
