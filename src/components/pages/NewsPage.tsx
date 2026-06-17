'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import useEmblaCarousel from 'embla-carousel-react';
import { getMediaUrl } from '@/lib/getMediaUrl';
import type { TelegramPost, PostMedia } from '@/types/vk';

/* ── Telegram Icon Component ──────────────────────────────────────────────────── */
function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function extractTitleAndBody(html: string): { title: string; body: string } {
  const match = html.match(/^\s*<strong>(.*?)<\/strong>\s*/);

  if (match) return { title: match[1], body: html.slice(match[0].length).trim() };
  const plain = html.replace(/<[^>]*>/g, '');
  const firstLine = plain.split('\n')[0].trim();
  const title = firstLine.length > 80 ? firstLine.slice(0, 80) + '…' : firstLine;
  const nl = html.indexOf('\n');
  return { title, body: nl > -1 ? html.slice(nl + 1).trim() : '' };
}


/* ── Media item with fallback ───────────────────────────────────────────────────────────── */
function MediaItem({ item, postLink }: { item: PostMedia; postLink: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Сброс состояния при изменении URL
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [item.url]);

  if (item.type === 'video') {
    return (
      <div className="relative w-full bg-[#1a1a1a] rounded-t-[20px] overflow-hidden">
        {hasError ? (
          <FallbackContent postLink={postLink} />
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <video
              controls
              poster={getMediaUrl(item.thumbnail)}
              playsInline
              className="w-full max-h-[500px] object-contain bg-black block"
              onError={() => setHasError(true)}
              onLoadedData={() => setIsLoading(false)}
            >
              <source src={getMediaUrl(item.url)} />
            </video>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#F9FAFB] rounded-t-[20px] overflow-hidden">
      {hasError ? (
        <FallbackContent postLink={postLink} />
      ) : (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]">
              <div className="w-8 h-8 border-3 border-[#2AABEE]/30 border-t-[#2AABEE] rounded-full animate-spin" />
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getMediaUrl(item.url)}
            alt="Фото из Telegram-канала Ультра Клининг"
            loading="lazy"
            className="w-full max-h-[500px] object-contain block"
            onError={() => setHasError(true)}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
}

/* ── Fallback component for blocked media ───────────────────────────────────────────────── */
function FallbackContent({ postLink }: { postLink: string }) {
  return (
    <div className="w-full min-h-[280px] md:min-h-[350px] bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center gap-5 p-6 text-center rounded-t-[20px]">
      <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
        <TelegramIcon size={32} />
      </div>
      <div>
        <p className="text-gray-400 text-xs md:text-sm">
          Перейдите в Telegram, чтобы увидеть публикацию
        </p>
      </div>
      <button
        onClick={() => window.open(postLink, '_blank')}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2AABEE] text-white font-semibold text-sm shadow-md hover:bg-[#1e9bd9] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none"
      >
        <TelegramIcon size={14} />
        Смотреть в Telegram
      </button>
    </div>
  );
}

/* ── Media carousel ───────────────────────────────────────────────────────── */
function MediaCarousel({ media, postLink }: { media: PostMedia[]; postLink: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {media.map((item, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <MediaItem item={item} postLink={postLink} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Предыдущее фото"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-none bg-white/90 cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white transition-colors z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Следующее фото"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-none bg-white/90 cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white transition-colors z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {media.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-colors duration-200 ${i === current ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Post card ────────────────────────────────────────────────────────────── */
function PostCard({ post, index }: { post: TelegramPost; index: number }) {
  const { title, body } = extractTitleAndBody(post.text);
  const date = format(new Date(post.date), 'd MMMM yyyy', { locale: ru });
  const media = post.media ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] w-full break-inside-avoid mb-8"
    >
      {media.length > 1
        ? <MediaCarousel media={media} postLink={post.linkToOriginal} />
        : media.length === 1
          ? <MediaItem item={media[0]} postLink={post.linkToOriginal} />
          : null}

      <div className="px-7 py-7">
        {title && (
          <h2 className="text-[22px] font-bold text-[#1C2B3A] mb-4 leading-snug">{title}</h2>
        )}

        {body && (
          <div
            className="text-base leading-[1.7] text-[#374151] whitespace-pre-line mb-0"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#F3F4F6] flex-wrap gap-3">
          <time dateTime={post.date} className="text-sm text-[#9CA3AF]">{date}</time>
          <a
            href={post.linkToOriginal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#2AABEE] text-white no-underline font-semibold text-sm shadow-[0_3px_12px_rgba(42,171,238,0.25)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(42,171,238,0.35)] transition-all duration-200"
          >
            <TelegramIcon size={14} />
            Смотреть в Telegram
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function NewsPage({ posts }: { posts: TelegramPost[] }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-[120px] pb-20">
      <div className="max-w-[1240px] mx-auto px-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#E3F2FD] text-[#2AABEE] rounded-full px-[18px] py-1.5 text-sm font-semibold mb-4">
            Блог
          </span>
          <h1 className="text-[clamp(28px,5vw,42px)] font-extrabold text-[#1C2B3A] mb-4 leading-snug">
            Новости из нашего <span className="text-[#2AABEE]">Telegram</span>
          </h1>
          <p className="text-lg text-[#6B7280] max-w-[600px] mx-auto">
            Полезные советы, акции и новости компании
          </p>
        </motion.div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-16 text-[#6B7280]">
            Новости скоро появятся. Подписывайтесь на наш Telegram-канал!
          </div>
        ) : (
          <div style={{ columns: '2 340px', columnGap: 32 }}>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <h2 className="text-2xl font-bold text-[#1C2B3A] mb-3">Хотите больше полезного контента?</h2>
          <p className="text-base text-[#6B7280] mb-6">Подписывайтесь на наш Telegram-канал</p>
          <a
            href="https://t.me/ultracleaninfo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#2AABEE] text-white no-underline font-bold text-base shadow-[0_4px_16px_rgba(42,171,238,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(42,171,238,0.4)] transition-all duration-200"
          >
            <TelegramIcon size={18} />
            Перейти в Telegram
          </a>
        </motion.div>
      </div>
    </div>
  );
}
