'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, ArrowLeft, Check, Hammer, Wind, Droplets, Sparkles, ClipboardCheck, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ServiceForm from '@/components/ui/ServiceForm';
import FadeIn from '@/components/ui/FadeIn';

const PRICE_TABLE = [
  { label: 'Квартира-студия до 30 м²',  price: 'от 6 000 ₽' },
  { label: '1-комнатная квартира',       price: 'от 8 000 ₽' },
  { label: '2-комнатная квартира',       price: 'от 12 000 ₽' },
  { label: '3-комнатная квартира',       price: 'от 16 000 ₽' },
  { label: 'Частный дом',                price: 'от 10 000 ₽' },
  { label: 'Коммерческое помещение',     price: 'от 200 ₽/м²' },
];

const INCLUDES = [
  'Удаление строительной пыли со всех поверхностей — стены, потолки, полы',
  'Мытьё окон: удаление наклеек, цемента, монтажной пены',
  'Чистка радиаторов и вентиляционных решёток от пыли',
  'Удаление следов краски, затирки, клея и скотча',
  'Глубокая очистка плитки и сантехники от цементного налёта',
  'Протирка осветительных приборов и розеток',
  'Уборка внутри шкафов и встроенной мебели',
  'Вынос мелкого строительного мусора',
  'Финальная влажная уборка всех поверхностей',
];

const STEPS = [
  { Icon: ClipboardCheck, title: 'Осмотр',           desc: 'Приезжаем, оцениваем объём и сложность загрязнений, называем точную цену' },
  { Icon: Hammer,         title: 'Подготовка',        desc: 'Привозим промышленные пылесосы Karcher и специализированную химию' },
  { Icon: Wind,           title: 'Обеспыливание',     desc: 'Удаляем строительную пыль сверху вниз — потолки, стены, полы' },
  { Icon: Droplets,       title: 'Химическая чистка', desc: 'Растворяем затирку, краску, клей и монтажную пену специальными средствами' },
  { Icon: Sparkles,       title: 'Финальная уборка',  desc: 'Влажная уборка всех поверхностей, мытьё окон, протирка приборов' },
  { Icon: ShieldCheck,    title: 'Приёмка',           desc: 'Проверяем результат вместе с вами. Гарантия — 24 часа' },
];

const WHY_US = [
  { title: 'Промышленное оборудование', desc: 'Пылесосы Karcher с HEPA-фильтрами — задерживают частицы до 0.3 мкм' },
  { title: 'Специальная химия',         desc: 'Средства для удаления цемента, краски и монтажной пены без вреда для покрытий' },
  { title: 'Опыт 5+ лет',              desc: 'Убрали более 500 квартир после ремонта в Краснодаре' },
  { title: 'Гарантия результата',       desc: 'Если что-то не устроит — вернёмся и переделаем бесплатно в течение 24 часов' },
];

const FAQS = [
  { q: 'Когда лучше заказывать уборку после ремонта?',       a: 'Когда все строительные и монтажные работы полностью завершены. Строительная пыль оседает ещё 2–3 дня после окончания работ — лучше подождать.' },
  { q: 'Входит ли мытьё окон в стоимость?',                  a: 'Да, мытьё окон после ремонта входит в стандартный пакет. Удаляем наклейки, цемент, монтажную пену и следы краски.' },
  { q: 'Как вы удаляете строительную пыль?',                 a: 'Используем промышленные пылесосы Karcher с HEPA-фильтрами и влажную уборку в несколько этапов с частой сменой воды. Обычный пылесос только разгоняет мелкодисперсную пыль по воздуху.' },
  { q: 'Справитесь ли вы со следами затирки на плитке?',     a: 'Да, используем специальные кислотные очистители, которые растворяют цементную затирку, не повреждая саму плитку и швы.' },
  { q: 'Сколько времени занимает уборка?',                   a: '1-комнатная квартира — 4–6 часов, 2-комнатная — 6–8 часов, 3-комнатная — 8–12 часов. Работает бригада из 2–3 человек.' },
  { q: 'Нужно ли мне присутствовать во время уборки?',       a: 'Нет, многие клиенты передают ключ или код. Все клинеры проверены и подписали договор о материальной ответственности.' },
  { q: 'Убираете ли вы строительный мусор?',                 a: 'Мелкий строительный мусор — да, входит в стоимость. Крупный вывоз (мешки с мусором, старые материалы) — по отдельному согласованию.' },
];

export default function PostRenovationPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[120px] pb-20">
        <Image
          src="https://images.unsplash.com/photo-1592414744366-9ced52b9dab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Уборка после ремонта в Краснодаре — удаление строительной пыли и следов краски"
          fill priority className="object-cover z-0" sizes="100vw"
        />
        <div aria-hidden="true" className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(135deg, rgba(28,43,58,0.92) 0%, rgba(167,0,0,0.25) 100%)' }} />

        <div className="relative z-[2] max-w-[1240px] mx-auto px-5 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumbs variant="light" items={[{ name: 'Главная', href: '/' }, { name: 'Уборка после ремонта' }]} />
            <div className="flex items-center gap-3 mb-6">
              <Link href="/" className="inline-flex items-center gap-2 text-white no-underline font-bold text-sm bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                <ArrowLeft size={16} aria-hidden="true" /> Назад
              </Link>
              <div className="inline-block bg-[#A70000] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.1em]">После ремонта</div>
            </div>
            <h1 className="text-[clamp(32px,6vw,60px)] font-black text-white mb-6 max-w-[800px] leading-[1.1] tracking-[-0.02em]">
              Уборка после ремонта в Краснодаре — приедем и уберём всё
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] text-white/90 max-w-[600px] leading-[1.6] mb-10">
              Строительная пыль, следы краски, цемент на плитке — справимся с любыми загрязнениями. Промышленное оборудование и специальная химия.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="bg-white text-[#1C2B3A] px-7 py-4 rounded-2xl font-extrabold text-xl">от 200 ₽/м²</div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/20">
                <Star size={20} className="fill-[#FFD700] text-[#FFD700]" />
                <span className="text-white font-bold">5.0 рейтинг</span>
              </div>
            </div>
            <a href="#order" className="inline-block bg-[#A70000] text-white px-10 py-5 rounded-2xl no-underline font-extrabold text-lg shadow-[0_10px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 transition-transform">
              Оставить заявку
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-5">

        {/* Описание + цены */}
        <section className="py-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <FadeIn direction="left">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-6">Об услуге</h2>
              <p className="text-[17px] text-[#64748B] leading-[1.8] mb-5">
                Уборка после ремонта — это не обычная уборка. Строительная пыль проникает в каждую щель, цемент намертво прилипает к плитке, краска остаётся на стёклах. Обычный пылесос только разгоняет мелкодисперсную пыль по воздуху.
              </p>
              <p className="text-[17px] text-[#64748B] leading-[1.8] mb-8">
                Мы используем промышленные пылесосы с HEPA-фильтрами и специализированную химию, которая растворяет строительные загрязнения без вреда для новых покрытий.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_US.map((item, i) => (
                  <div key={i} className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#F1F5F9]">
                    <h4 className="text-[15px] font-extrabold text-[#1C2B3A] mb-2">{item.title}</h4>
                    <p className="text-[13px] text-[#64748B] leading-[1.5]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-8">Цены</h2>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#F1F5F9] mb-10">
                {PRICE_TABLE.map((row, i) => (
                  <div key={i} className={`flex justify-between items-center pb-4 ${i < PRICE_TABLE.length - 1 ? 'border-b border-[#E2E8F0] mb-4' : ''}`}>
                    <span className="text-[15px] font-semibold text-[#1C2B3A]">{row.label}</span>
                    <span className="text-base font-extrabold text-[#A70000] ml-4 whitespace-nowrap">{row.price}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-6">Что входит</h2>
              <div className="flex flex-col gap-3.5">
                {INCLUDES.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#A70000]" strokeWidth={4} />
                    </div>
                    <span className="text-[15px] text-[#475569] leading-[1.5] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Этапы */}
        <section className="bg-[#F9FAFB] rounded-[40px] px-10 py-20 mb-[100px]">
          <FadeIn className="text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,40px)] font-black text-[#1C2B3A]">Как мы работаем</h2>
            <p className="text-[17px] text-[#64748B] mt-3 max-w-[500px] mx-auto">Чёткий процесс — никаких сюрпризов</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map(({ Icon, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="bg-white rounded-3xl p-8 border border-[#F1F5F9]">
                  <div className="text-xs text-[#A70000] font-extrabold uppercase tracking-[0.1em] mb-4">Шаг {i + 1}</div>
                  <Icon size={28} className="text-[#A70000] mb-4" />
                  <h4 className="text-lg font-extrabold text-[#1C2B3A] mb-2">{title}</h4>
                  <p className="text-sm text-[#64748B] leading-[1.5]">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FAQ + Форма */}
        <section id="order" className="pb-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <FadeIn direction="left">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-10">Вопросы и ответы</h2>
              <FAQAccordion faqs={FAQS} />
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-[#1C2B3A] rounded-[32px] p-6 sm:p-12 text-white lg:sticky lg:top-[100px]">
                <ServiceForm serviceName="Уборка после ремонта" subtitle="Оставьте номер — перезвоним в течение 5 минут, назовём точную цену." />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
