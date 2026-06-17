'use client';

import { motion } from 'motion/react';
import { useRouter, usePathname } from 'next/navigation';
import { Star, Clock, Leaf, Shield, ChevronDown } from 'lucide-react';
import { contacts } from '@/lib/contacts';
import { scrollToSection } from '@/lib/scrollTo';

const badges = [
  { icon: Clock,   text: 'Круглосуточно' },
  { icon: Leaf,    text: 'Эко-химия'     },
  { icon: Star,    text: 'Рейтинг 5.0'  },
  { icon: Shield,  text: 'Гарантия'      },
] as const;

export default function HeroSection() {
  const router   = useRouter();
  const pathname = usePathname();

  const handleCalc = () => scrollToSection('calc', p => router.push(p), pathname);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[120px] pb-[60px]">

      {/* ── Фоновое видео ──────────────────────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Оверлей ────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(28,43,58,0.88) 0%, rgba(220,38,38,0.15) 100%)',
        }}
      />

      {/* ── Контент ────────────────────────────────────────────────────────── */}
      <div className="relative z-[2] w-full max-w-[1240px] mx-auto px-5">
        <div className="max-w-[800px]">

          {/* Рейтинг-бейдж */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2 mb-8 border border-white/20"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={14} className="fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span className="text-white text-sm font-bold">
              5.0 · {contacts.reviewCount} отзывов на Яндекс Картах
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(32px,8vw,64px)] font-black text-white leading-[1.1] tracking-[-0.03em] mb-6"
          >
            Профессиональная уборка в{' '}
            <span className="text-[#A70000]">Краснодаре</span>{' '}
            — приедем сегодня
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(16px,2vw,20px)] text-white/90 mb-10 leading-[1.6] max-w-[600px]"
          >
            Используем эко-химию, даём 100% гарантию результата.
            Убираем квартиры, дома и офисы круглосуточно.
          </motion.p>

          {/* CTA-кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {/* Рассчитать стоимость */}
            <button
              onClick={handleCalc}
              className="
                px-8 py-[18px] rounded-2xl bg-[#A70000] text-white font-bold text-base
                border-none cursor-pointer
                shadow-[0_10px_25px_rgba(220,38,38,0.35)]
                hover:-translate-y-0.5 active:translate-y-0
                transition-transform duration-200
              "
            >
              Рассчитать стоимость
            </button>

            {/* WhatsApp */}
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="
                flex items-center gap-2 px-8 py-[18px] rounded-2xl
                bg-white/10 border-2 border-white/30 text-white font-bold text-base
                no-underline backdrop-blur-lg
                hover:bg-white/20 active:bg-white/15
                transition-colors duration-200
              "
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </motion.div>

          {/* Бейджи преимуществ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="
              grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4
              border-t border-white/15 pt-8
            "
          >
            {badges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-white flex items-center justify-center shrink-0 text-[#A70000]">
                  <Icon size={18} />
                </div>
                <span className="text-white text-[13px] font-semibold leading-snug">{text}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Скролл-индикатор ───────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-0 right-0 flex justify-center text-white/50 z-[2]"
        aria-hidden="true"
      >
        <ChevronDown size={32} />
      </motion.div>

    </section>
  );
}

/* ── Inline SVG WhatsApp (без лишней зависимости) ─────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
