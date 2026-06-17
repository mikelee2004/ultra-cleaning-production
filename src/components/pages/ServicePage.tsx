'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, ArrowLeft, Check } from 'lucide-react';
import { serviceData } from '@/lib/serviceData';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ServiceForm from '@/components/ui/ServiceForm';
import FadeIn from '@/components/ui/FadeIn';

export default function ServicePage({ slug }: { slug: string }) {
  const data = serviceData[slug];
  if (!data) return null;

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[120px] pb-20">
        <Image
          src={data.image}
          alt={`${data.title} в Краснодаре — Ультра Клининг`}
          fill
          priority
          className="object-cover z-0"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(135deg, rgba(28,43,58,0.9) 0%, rgba(220,38,38,0.2) 100%)' }}
        />

        <div className="relative z-[2] max-w-[1240px] mx-auto px-5 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumbs variant="light" items={[{ name: 'Главная', href: '/' }, { name: data.title }]} />

            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white no-underline font-bold text-sm bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Назад
              </Link>
              <div className="inline-block bg-[#A70000] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.1em]">
                {data.tag}
              </div>
            </div>

            <h1 className="text-[clamp(32px,6vw,56px)] font-black text-white mb-6 max-w-[800px] leading-[1.1] tracking-[-0.02em]">
              {data.h1}
            </h1>

            <p className="text-[clamp(16px,2vw,20px)] text-white/90 max-w-[600px] leading-[1.6] mb-10">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <div className="bg-white text-[#1C2B3A] px-7 py-4 rounded-2xl font-extrabold text-xl">
                {data.price}
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/20">
                <Star size={20} className="fill-[#FFD700] text-[#FFD700]" />
                <span className="text-white font-bold">5.0 рейтинг</span>
              </div>
            </div>

            <a
              href="#order"
              className="inline-block bg-[#A70000] text-white px-10 py-5 rounded-2xl no-underline font-extrabold text-lg shadow-[0_10px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5 transition-transform"
            >
              Оставить заявку
            </a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-5">

        {/* ── Описание + цены + что входит ──────────────────────────────── */}
        <section className="py-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            <FadeIn direction="left">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-6">Об услуге</h2>
              <p className="text-[17px] text-[#64748B] leading-[1.8] mb-8">{data.desc}</p>

              <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#F1F5F9]">
                <h3 className="text-xl font-extrabold text-[#1C2B3A] mb-6">Цены</h3>
                <div className="flex flex-col gap-4">
                  {data.priceTable.map((row, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center pb-4 ${i < data.priceTable.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
                    >
                      <span className="text-[15px] font-semibold text-[#1C2B3A]">{row.label}</span>
                      <span className="text-base font-extrabold text-[#A70000] ml-4 whitespace-nowrap">{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-8">Что входит</h2>
              <div className="flex flex-col gap-4">
                {data.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-[#A70000]" strokeWidth={4} />
                    </div>
                    <span className="text-base text-[#475569] leading-[1.5] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Этапы работы ──────────────────────────────────────────────── */}
        <section className="bg-[#F9FAFB] rounded-[40px] px-10 py-20 mb-[100px]">
          <FadeIn className="text-center mb-12">
            <h2 className="text-[32px] font-black text-[#1C2B3A]">Этапы работы</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {data.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="bg-white rounded-3xl p-8 border border-[#F1F5F9]">
                  <div className="text-xs text-[#A70000] font-extrabold uppercase tracking-[0.1em] mb-4">
                    Шаг {i + 1}
                  </div>
                  <div className="text-[36px] mb-4">{step.icon}</div>
                  <h4 className="text-lg font-extrabold text-[#1C2B3A] mb-2">{step.title}</h4>
                  <p className="text-sm text-[#64748B] leading-[1.5]">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── FAQ + Форма ───────────────────────────────────────────────── */}
        <section id="order" className="pb-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            <FadeIn direction="left">
              <h2 className="text-[32px] font-black text-[#1C2B3A] mb-10">Вопросы и ответы</h2>
              <FAQAccordion faqs={data.faqs} />
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-[#1C2B3A] rounded-[32px] p-6 sm:p-12 text-white lg:sticky lg:top-[100px]">
                <ServiceForm serviceName={data.title} />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
