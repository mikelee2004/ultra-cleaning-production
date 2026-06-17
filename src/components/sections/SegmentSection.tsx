'use client';

import Link from 'next/link';
import { Home, Hammer, Zap, PartyPopper, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import FadeIn from '@/components/ui/FadeIn';

const segments = [
  { icon: Home,        title: 'Поддерживающая уборка', desc: 'Поверхностная уборка для поддержания чистоты и порядка',                                    price: 'от 100 ₽/м²',              href: '/regularcleaning',       special: false },
  { icon: null,        title: 'Генеральная уборка',     desc: 'Тщательная уборка от пола до потолка и в самых труднодоступных местах',                      price: 'от 150 ₽/м²',              href: '/generalcleaning',       special: false },
  { icon: Hammer,      title: 'После ремонта',          desc: 'Уберём строительную пыль, цемент и следы ремонта',                                            price: 'от 200 ₽/м²',              href: '/postrenovationcleaning', special: false },
  { icon: PartyPopper, title: 'После праздника',        desc: 'Быстро приведём помещение в порядок после вечеринки или торжества',                           price: 'от 200 ₽/м²',              href: '/generalcleaning',       special: false },
  { icon: Zap,         title: 'Срочная уборка',         desc: 'Нужно срочно? Приедем к вам как можно скорее',                                                price: 'Выезд в течение 60 минут', href: '/generalcleaning',       special: true  },
] as const;

export default function SegmentSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="max-w-[1240px] mx-auto px-5">

        <FadeIn className="text-center mb-14">
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            Выберите свою <span className="text-[#A70000]">ситуацию</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[600px] mx-auto leading-[1.6]">
            Расскажите нам о задаче — подберём оптимальное решение и рассчитаем точную стоимость
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <FadeIn key={seg.title} delay={i * 0.06}>
                <Link
                  href={seg.href}
                  className={cn(
                    'group flex flex-col h-full rounded-3xl p-8 no-underline border transition-all duration-300',
                    'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]',
                    seg.special
                      ? 'bg-[#1C2B3A] border-transparent'
                      : 'bg-white border-black/5 hover:border-[#A70000] shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
                  )}
                >
                  <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center mb-6',
                    seg.special ? 'bg-[#A70000] text-white' : 'bg-[#F9FAFB] text-[#A70000]',
                  )}>
                    {Icon ? <Icon size={32} /> : (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V9.5Z" />
                      </svg>
                    )}
                  </div>
                  <h3 className={cn('text-[22px] font-extrabold mb-3', seg.special ? 'text-white' : 'text-[#1C2B3A]')}>{seg.title}</h3>
                  <p className={cn('text-[15px] leading-[1.6] mb-6 grow', seg.special ? 'text-white/70' : 'text-[#64748B]')}>{seg.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={cn('text-lg font-extrabold', seg.special ? 'text-white' : 'text-[#A70000]')}>{seg.price}</span>
                    <ArrowRight size={20} className={cn(seg.special ? 'text-[#A70000]' : 'text-[#1C2B3A]')} />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
