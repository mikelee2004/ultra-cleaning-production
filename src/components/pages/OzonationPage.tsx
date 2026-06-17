'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, ArrowLeft, Wind, ShieldCheck, Zap, Clock, Leaf, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ServiceForm from '@/components/ui/ServiceForm';
import FadeIn from '@/components/ui/FadeIn';

const PRICE_TABLE = [
  { label: 'Комната / кабинет до 20 м²',  price: 'от 1 400 ₽' },
  { label: 'Квартира-студия до 30 м²',     price: 'от 2 100 ₽' },
  { label: '1-комнатная квартира',          price: 'от 2 800 ₽' },
  { label: '2-комнатная квартира',          price: 'от 4 200 ₽' },
  { label: '3-комнатная квартира',          price: 'от 5 600 ₽' },
  { label: 'Офис / коммерческое помещение', price: 'от 70 ₽/м²' },
  { label: 'Автомобиль',                    price: 'от 1 500 ₽' },
];

const WHEN_NEEDED = [
  { icon: '🔥', title: 'После пожара',    desc: 'Устраняем запах гари и продукты горения из воздуха и поверхностей' },
  { icon: '💧', title: 'После потопа',    desc: 'Уничтожаем плесень, грибок и запах сырости после затопления' },
  { icon: '🐾', title: 'Запах животных', desc: 'Нейтрализуем стойкий запах кошек, собак и других питомцев' },
  { icon: '🚬', title: 'Запах табака',   desc: 'Полностью убираем запах сигарет из квартиры или автомобиля' },
  { icon: '🦠', title: 'Дезинфекция',    desc: 'Уничтожаем бактерии, вирусы, грибки и споры плесени' },
  { icon: '🏗️', title: 'После ремонта', desc: 'Выводим запах краски, лака, растворителей и строительных материалов' },
];

const HOW_IT_WORKS = [
  { Icon: Wind,        title: 'Что такое озон',      desc: 'Озон (O₃) — активная форма кислорода. Он окисляет и разрушает молекулы запахов, бактерии и вирусы на молекулярном уровне, не оставляя химических следов.' },
  { Icon: Zap,         title: 'Как работает аппарат', desc: 'Промышленный озонатор вырабатывает концентрированный озон и распределяет его по всему помещению. Проникает в поры, ткани, вентиляцию — туда, куда не добраться химией.' },
  { Icon: Clock,       title: 'Время обработки',      desc: 'Обработка занимает 1–3 часа в зависимости от площади и степени загрязнения. После этого помещение проветривается 1–2 часа — и можно заходить.' },
  { Icon: Leaf,        title: 'Безопасность',          desc: 'Озон полностью распадается до обычного кислорода. После проветривания никаких остатков химии — безопасно для детей, животных и аллергиков.' },
];

const STEPS = [
  { icon: '📞', title: 'Заявка',       desc: 'Звоните или пишите — расскажите о проблеме' },
  { icon: '🔍', title: 'Оценка',       desc: 'Уточняем площадь, тип запаха и степень загрязнения' },
  { icon: '🚗', title: 'Выезд',        desc: 'Приезжаем с промышленным озонатором' },
  { icon: '🚪', title: 'Обработка',    desc: 'Запускаем аппарат, помещение должно быть пустым' },
  { icon: '💨', title: 'Проветривание', desc: 'После обработки проветриваем 1–2 часа' },
  { icon: '✅', title: 'Результат',    desc: 'Заходите — свежий воздух без запахов и микробов' },
];

const FAQS = [
  { q: 'Нужно ли уходить из квартиры во время озонирования?',          a: 'Да, обязательно. Во время работы озонатора в помещении не должно быть людей, животных и растений. После завершения — проветриваем 1–2 часа, затем можно заходить.' },
  { q: 'Озонирование действительно убивает запах или только маскирует?', a: 'Убивает. Озон окисляет молекулы запаха на химическом уровне — они разрушаются, а не перебиваются другим ароматом. Это принципиальное отличие от освежителей воздуха.' },
  { q: 'Поможет ли озонирование от запаха кошки?',                      a: 'Да, это один из самых частых запросов. Озон нейтрализует аммиак и другие компоненты кошачьей мочи. Для сильных загрязнений рекомендуем сначала провести химчистку мягкой мебели.' },
  { q: 'Как долго держится эффект?',                                     a: 'Эффект постоянный — запах не возвращается, если устранён его источник. Если источник не убран (например, плесень в стене), запах может появиться снова.' },
  { q: 'Безопасно ли для мебели и техники?',                            a: 'Да, при правильной концентрации озон не повреждает мебель, ткани и технику. Рекомендуем убрать натуральную кожу и резиновые изделия на время обработки.' },
  { q: 'Можно ли озонировать автомобиль?',                              a: 'Да, это очень популярная услуга. Убираем запах табака, животных, сырости и плесени из салона. Занимает 30–60 минут.' },
  { q: 'Убивает ли озон коронавирус и другие вирусы?',                  a: 'Да, озон является эффективным дезинфектантом против широкого спектра вирусов и бактерий, включая SARS-CoV-2. Это подтверждено исследованиями.' },
];

export default function OzonationPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[120px] pb-20">
        <Image
          src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400"
          alt="Озонирование помещений в Краснодаре — устранение запахов и дезинфекция"
          fill priority className="object-cover z-0" sizes="100vw"
        />
        <div aria-hidden="true" className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(135deg, rgba(28,43,58,0.93) 0%, rgba(167,0,0,0.2) 100%)' }} />

        <div className="relative z-[2] max-w-[1240px] mx-auto px-5 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumbs variant="light" items={[{ name: 'Главная', href: '/' }, { name: 'Озонирование помещений' }]} />
            <Link href="/" className="inline-flex items-center gap-2 text-white no-underline font-bold text-sm mb-6 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft size={16} aria-hidden="true" /> Назад
            </Link>
            <div className="inline-block bg-[#A70000] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.1em] mb-6">Озонирование</div>
            <h1 className="text-[clamp(32px,6vw,60px)] font-black text-white mb-6 max-w-[800px] leading-[1.1] tracking-[-0.02em]">
              Озонирование помещений в Краснодаре — устраним любой запах
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] text-white/90 max-w-[620px] leading-[1.6] mb-10">
              Промышленный озонатор уничтожает запахи, бактерии и вирусы на молекулярном уровне. Без химии, без маскировки — только чистый воздух.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="bg-white text-[#1C2B3A] px-7 py-4 rounded-2xl font-extrabold text-xl">от 70 ₽/м²</div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/20">
                <Star size={20} className="fill-[#FFD700] text-[#FFD700]" />
                <span className="text-white font-bold">5.0 рейтинг</span>
              </div>
            </div>
            <a href="#order" className="inline-block bg-[#A70000] text-white px-10 py-5 rounded-2xl no-underline font-extrabold text-lg shadow-[0_10px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 transition-transform">
              Вызвать озонатор
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-5">

        {/* Когда нужно */}
        <section className="pt-[100px] pb-16">
          <FadeIn className="text-center mb-14">
            <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">Когда нужно</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-black text-[#1C2B3A] tracking-[-0.02em]">
              В каких случаях поможет <span className="text-[#A70000]">озонирование</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHEN_NEEDED.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-[#F8FAFC] rounded-[20px] p-7 border border-[#F1F5F9] hover:border-[#A70000] hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200">
                  <div className="text-[36px] mb-4">{item.icon}</div>
                  <h3 className="text-lg font-extrabold text-[#1C2B3A] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-[1.6]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Как работает */}
        <section className="py-16">
          <FadeIn className="text-center mb-14">
            <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">Принцип работы</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-black text-[#1C2B3A] tracking-[-0.02em]">
              Как работает <span className="text-[#A70000]">озонирование</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ Icon, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-[#1C2B3A] rounded-3xl p-9 text-white">
                  <Icon size={28} className="text-[#A70000] mb-5" />
                  <h4 className="text-lg font-extrabold mb-3">{title}</h4>
                  <p className="text-sm text-white/65 leading-[1.7]">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Предупреждение */}
        <FadeIn className="py-5">
          <div className="bg-[#FEF3C7] rounded-[20px] p-7 border border-[#FCD34D] flex gap-4 items-start">
            <AlertTriangle size={24} className="text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-extrabold text-[#92400E] mb-2">Важно знать перед озонированием</h4>
              <p className="text-sm text-[#78350F] leading-[1.7]">
                Во время обработки в помещении не должно быть людей, животных и растений. Уберите натуральную кожу и резиновые изделия. После завершения — проветрите помещение 1–2 часа перед входом.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Цены + этапы */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-8">Цены</h2>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#F1F5F9]">
                {PRICE_TABLE.map((row, i) => (
                  <div key={i} className={`flex justify-between items-center pb-4 ${i < PRICE_TABLE.length - 1 ? 'border-b border-[#E2E8F0] mb-4' : ''}`}>
                    <span className="text-[15px] font-semibold text-[#1C2B3A]">{row.label}</span>
                    <span className="text-base font-extrabold text-[#A70000] ml-4 whitespace-nowrap">{row.price}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-8">Как проходит выезд</h2>
              <div className="flex flex-col gap-4">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-[#FEE2E2] flex items-center justify-center text-xl shrink-0">{step.icon}</div>
                    <div>
                      <div className="text-[15px] font-extrabold text-[#1C2B3A] mb-0.5">{step.title}</div>
                      <div className="text-sm text-[#64748B] leading-[1.5]">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
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
                <ServiceForm serviceName="Озонирование помещений" title="Вызвать озонатор" subtitle="Оставьте номер — перезвоним в течение 5 минут и согласуем время выезда." ctaLabel="Отправить заявку" />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
