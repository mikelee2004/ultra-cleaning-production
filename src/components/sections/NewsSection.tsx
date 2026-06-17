'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Newspaper, Send } from 'lucide-react';
import { getMediaUrl } from '@/lib/getMediaUrl';
import type { TelegramPost } from '@/types/vk';

/* ── Skeleton ──────────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] bg-white">
      <div className="w-full h-[200px] shimmer" />
      <div className="p-5 space-y-2.5">
        <div className="h-3.5 w-full rounded shimmer" />
        <div className="h-3.5 w-4/5 rounded shimmer" />
        <div className="h-3.5 w-3/5 rounded shimmer" />
        <div className="h-3 w-2/5 rounded shimmer mt-5" />
      </div>
    </div>
  );
}

/* ── News card ─────────────────────────────────────────────────────────────── */
function NewsCard({ post }: { post: TelegramPost }) {
  const media = post.media?.[0];
  const plainText = post.text.replace(/<[^>]*>/g, '');
  const title = plainText.split('\n')[0].slice(0, 80);
  const date = format(new Date(post.date), 'd MMMM yyyy', { locale: ru });

  return (
    <Link
      href="/news"
      className="group flex flex-col no-underline rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] bg-white h-full hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-200"
    >
      {/* Media */}
      {media ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={getMediaUrl(media.url)} alt="" loading="lazy" className="w-full h-[220px] object-cover block" />
      ) : (
        <div className="w-full h-[220px] bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center">
          <Newspaper size={48} className="text-[#9CA3AF]" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {title && <h3 className="text-lg font-bold text-[#1C2B3A] mb-3 leading-snug">{title}</h3>}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F3F4F6]">
          <time dateTime={post.date} className="text-sm text-[#6B7280]">{date}</time>
          <span className="text-sm font-semibold text-[#A70000]">Читать →</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Section ───────────────────────────────────────────────────────────────── */
export default function NewsSection() {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    // Запрос к локальному Next.js API роуту — он проксирует к Telegram Worker
    fetch(`/api/telegram-posts?limit=6`, { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setPosts(Array.isArray(d?.posts) ? d.posts : []); setLoading(false); })
      .catch(e => { if (e?.name !== 'AbortError') setLoading(false); });
    return () => ctrl.abort();
  }, []);

  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="max-w-[1240px] mx-auto px-5">

        <div className="text-center mb-12">
          <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-semibold mb-4">
            Новости
          </span>
          <h2 className="text-[clamp(24px,4vw,36px)] font-extrabold text-[#1C2B3A] leading-snug">
            Последние новости из{' '}
            <span className="text-[#2AABEE]">Telegram</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-[#1C2B3A] mb-2">Пока новостей нет</h3>
            <p className="text-[#6B7280]">Скоро здесь появятся свежие посты из нашего Telegram-канала</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <NewsCard post={post} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="https://t.me/ultracleaninfo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#2AABEE] text-white font-bold no-underline shadow-[0_4px_16px_rgba(42,171,238,0.3)] hover:-translate-y-0.5 transition-transform duration-200"
          >
            <Send size={18} />
            Перейти в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
