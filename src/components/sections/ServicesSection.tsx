'use client';

import Link from 'next/link';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const services = [
  { title: 'Генеральная уборка',     desc: 'Полная уборка всего жилья: от потолков до плинтусов. Идеально после зимы, перед праздниками или для смены арендаторов.', price: 'от 150 ₽/м²',      time: 'от 3 часов',   href: '/generalcleaning',        icon: '🏠' },
  { title: 'Поддерживающая уборка',  desc: 'Регулярное поддержание чистоты в вашем доме. Пылесос, влажная уборка, санузел, кухня — всё по чек-листу.',               price: 'от 100 ₽/м²',      time: 'от 1.5 часов', href: '/regularcleaning',        icon: '✨' },
  { title: 'Уборка после ремонта',   desc: 'Удаляем строительную пыль, цемент, шпаклёвку, краску. Ваш дом будет готов к заселению.',                                  price: 'от 200 ₽/м²',      time: 'от 1 дня',     href: '/postrenovationcleaning', icon: '🔨' },
  { title: 'Химчистка мебели',       desc: 'Профессиональная чистка диванов, кресел, матрасов, стульев. Удаляем пятна, запахи, аллергены.',                           price: 'от 1 500 ₽/шт',    time: 'от 2 часов',   href: '/furniturecleaning',      icon: '🛋️' },
  { title: 'Мытьё окон',             desc: 'Чистые окна внутри и снаружи без разводов. Работаем на любых этажах с соблюдением техники безопасности.',                 price: 'от 400 ₽/створка', time: 'от 1 часа',    href: '/windowcleaning',         icon: '🪟' },
  { title: 'Коммерческая уборка',    desc: 'Офисы, торговые площади, склады. Регулярное обслуживание с договором и закрывающими документами для юрлиц.',              price: 'от 180 ₽/м²',      time: 'По графику',   href: '/commercialcleaning',     icon: '🏢' },
  { title: 'Озонирование помещения', desc: 'Профессиональное обеззараживание воздуха и поверхностей. Устраняет запахи, бактерии, вирусы и аллергены.',                price: '70 ₽/м²',          time: 'от 1 часа',    href: '/ozonation',              icon: '🌬️' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="max-w-[1240px] mx-auto px-5">

        <FadeIn className="text-center mb-14">
          <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            Наши услуги
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            Профессиональный <span className="text-[#A70000]">клининг</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[600px] mx-auto leading-[1.6]">
            Обеспечим идеальную чистоту и свежесть в вашем помещении с использованием профессионального оборудования и эко-химии
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.href} delay={i * 0.05} className="flex flex-col h-full">
              <div className="group flex flex-col bg-white rounded-3xl p-8 border border-[#F1F5F9] h-full hover:border-[#A70000] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="text-2xl font-extrabold text-[#1C2B3A] mb-3">{s.title}</h3>
                <p className="text-base text-[#64748B] leading-[1.6] mb-6 grow">{s.desc}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-[10px]">
                    <Clock size={16} className="text-[#A70000]" />
                    <span className="text-sm font-semibold text-[#475569]">{s.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-[10px]">
                    <CheckCircle2 size={16} className="text-[#A70000]" />
                    <span className="text-sm font-semibold text-[#475569]">Гарантия</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9]">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wider">Стоимость</span>
                    <span className="text-xl font-black text-[#1C2B3A]">{s.price}</span>
                  </div>
                  <Link href={s.href} aria-label={`Подробнее: ${s.title}`} className="w-12 h-12 rounded-2xl bg-[#A70000] text-white flex items-center justify-center no-underline hover:scale-110 transition-transform duration-200">
                    <ArrowRight size={22} />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
