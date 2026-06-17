'use client';

import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const cases = [
  {
    tag: 'Генеральная уборка',
    title: 'Кухня: генеральная уборка',
    desc: 'Кухня после длительного использования — жир на поверхностях, загрязнения на плите и вытяжке. Полностью восстановили чистоту за несколько часов.',
    result: 'Сияет как новая',
    before: '/before-after/before1.jpg',
    after: '/before-after/after1.jpg',
  },
  {
    tag: 'Уборка комнаты',
    title: 'Рабочее место: уборка',
    desc: 'Захламлённое рабочее место с накопившимся мусором и пылью. Разобрали, вымыли все поверхности — пространство снова располагает к работе.',
    result: 'Порядок и чистота',
    before: '/before-after/before2.jpg',
    after: '/before-after/after2.jpg',
  },
  {
    tag: 'Детская комната',
    title: 'Детская: генеральная уборка',
    desc: 'Детская комната с разбросанными игрушками и загрязнёнными поверхностями. Провели безопасную уборку с эко-химией — безвредно для детей.',
    result: 'Безопасно и чисто',
    before: '/before-after/before3.jpg',
    after: '/before-after/after3.jpg',
  },
];

function BeforeAfterCard({ item }: { item: typeof cases[0] }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPosition(pct);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  setPosition(p => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setPosition(p => Math.min(100, p + 5));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#F1F5F9]">
      {/* ── Слайдер ─────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        role="slider"
        aria-label={`Сравнение до и после: ${item.title}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={e => { if (isDragging) handleMove(e.clientX); }}
        onTouchMove={e => { e.preventDefault(); handleMove(e.touches[0].clientX); }}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          height: 280,
          cursor: 'ew-resize',
          userSelect: 'none',
          overflow: 'hidden',
          outline: 'none',
        }}
      >
        {/* ПОСЛЕ — базовый слой, всегда 100% */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.after}
          alt={`${item.title} — после`}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* ДО — поверх, обрезается через clipPath */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.before}
          alt={`${item.title} — до`}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        />

        {/* Разделительная линия */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: 2,
            background: '#A70000',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Ручка */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#A70000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 20px rgba(220,38,38,0.4)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <ChevronLeft size={14} />
          <ChevronRight size={14} />
        </div>

        {/* Лейблы */}
        <span style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6, backdropFilter: 'blur(4px)' }}>
          ДО
        </span>
        <span style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: '#A70000', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6 }}>
          ПОСЛЕ
        </span>
      </div>

      {/* ── Описание ────────────────────────────────────────────────────── */}
      <div className="p-6">
        <span className="text-xs font-extrabold text-[#A70000] uppercase tracking-[0.05em] block mb-3">{item.tag}</span>
        <h3 className="text-xl font-extrabold text-[#1C2B3A] mb-3">{item.title}</h3>
        <p className="text-sm text-[#64748B] leading-[1.6] mb-5">{item.desc}</p>
        <div className="flex items-center gap-2 bg-[#F8FAFC] px-4 py-3 rounded-xl">
          <CheckCircle2 size={18} className="text-[#A70000] shrink-0" />
          <span className="text-sm font-semibold text-[#1C2B3A]">{item.result}</span>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <FadeIn direction="left">
            <span className="text-[#A70000] font-extrabold text-sm uppercase tracking-[0.1em] block mb-3">Результаты</span>
            <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] leading-[1.1] tracking-[-0.02em]">
              Как мы <span className="text-[#A70000]">убираем</span>
            </h2>
          </FadeIn>
          <FadeIn direction="right">
            <p className="text-[17px] text-[#64748B] max-w-[450px] leading-[1.6]">
              Посмотрите реальные примеры наших работ. Перемещайте ползунок, чтобы увидеть разницу.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.07}>
              <BeforeAfterCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
