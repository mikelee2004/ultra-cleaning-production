'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import FadeIn from '@/components/ui/FadeIn';

const faqs = [
  { q: 'Сколько стоит уборка квартиры?',        a: 'Стоимость зависит от площади и типа уборки. Поддерживающая — от 100 ₽/м², генеральная — от 150 ₽/м², после ремонта — от 200 ₽/м², после праздника — от 200 ₽/м², после смерти — от 300 ₽/м², после ЧС (потоп, пожар) — от 350 ₽/м². Точная стоимость зависит от квадратуры — воспользуйтесь калькулятором на сайте или позвоните менеджеру.' },
  { q: 'Как быстро вы можете приехать?',         a: 'Принимаем заявки круглосуточно. Срочный выезд — в течение 60 минут по Краснодару. Плановая уборка — в любое удобное для вас время, которое мы согласуем заранее.' },
  { q: 'Вы используете безопасную химию?',       a: 'Да, мы работаем только с профессиональной сертифицированной эко-химией. Все средства безопасны для детей, домашних животных и аллергиков. По запросу предоставляем сертификаты на используемые препараты.' },
  { q: 'Нужно ли быть дома во время уборки?',    a: 'Не обязательно. Многие наши клиенты оставляют ключ или код от замка и уходят по делам. Всем клинерам мы доверяем — они проходят проверку и подписывают договор о материальной ответственности.' },
  { q: 'Что делать, если результат не устроил?', a: 'Мы даём гарантию на нашу работу. Если что-то не понравится — сообщите нам в течение 24 часов, и мы вернёмся и бесплатно исправим недочёты. Ваше удовлетворение важнее всего.' },
  { q: 'Работаете ли вы с юридическими лицами?', a: 'Да, работаем с ИП и ООО. Заключаем официальный договор, предоставляем все закрывающие документы. Для корпоративных клиентов действуют специальные условия при регулярном обслуживании.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F9FAFB] py-[100px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-[900px] mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            <HelpCircle size={16} /> Помощь
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            Частые <span className="text-[#A70000]">вопросы</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[500px] mx-auto leading-[1.6]">
            Ответы на самые популярные вопросы о нашей работе и сервисе
          </p>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className={cn(
                'bg-white rounded-[20px] border overflow-hidden transition-all duration-200',
                openIndex === i ? 'border-[#A70000] shadow-[0_10px_25px_rgba(220,38,38,0.05)]' : 'border-[#F1F5F9]',
              )}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between px-8 py-6 bg-transparent border-none cursor-pointer text-left"
                >
                  <span className={cn('text-lg font-bold transition-colors duration-200', openIndex === i ? 'text-[#A70000]' : 'text-[#1C2B3A]')}>
                    {faq.q}
                  </span>
                  <ChevronDown size={24} className={cn('shrink-0 transition-all duration-300', openIndex === i ? 'rotate-180 text-[#A70000]' : 'text-[#94A3B8]')} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-8 pb-8 text-[#64748B] text-base leading-[1.7]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
