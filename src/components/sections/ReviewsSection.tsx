'use client';

import { useState, useEffect } from 'react';
import { TestimonialsColumn, type Testimonial } from '@/components/ui/TestimonialsColumn';
import FadeIn from '@/components/ui/FadeIn';

const testimonials: Testimonial[] = [
  { text: 'После ремонта встал вопрос уборки. Приехали две девочки — Галина и Виктория. Посмотрели объём и взялись за дело. Результат превзошёл все ожидания, квартира засияла!', name: 'Екатерина Земляная', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'После ремонта' },
  { text: 'Замечательный сервис. Привели в порядок квартиру так, что любо дорого глядеть. Искала специалистов с чёткими сроками — нашла именно таких. Очень довольна!', name: 'Э.', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Генеральная' },
  { text: 'Очень качественный сервис, рекомендую. Просите мастера Галину — таких специалистов осталось мало. Менеджер Ангелина — это двигатель фирмы, и это не громкие слова!', name: 'Александр Донской', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Генеральная' },
  { text: 'Совет знакомых оказался на 100% верным! Работники с золотыми руками, отзывчивые и компетентные. Вернулся из отпуска в неухоженную квартиру — навели идеальный порядок. Ни одного пятнышка!', name: 'Гость', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Генеральная' },
  { text: 'Ценю своё время и чёткость. Заказал уборку через сайт, быстро перезвонили, уточнили детали. Бригада приехала ровно в назначенный час. Я удалённо работал в кабинете, они тихонько делали своё дело.', name: 'Никита Кондратюк', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Поддерживающая' },
  { text: 'Регулярно пользуемся услугами этой компании. Недавно заехали в новую квартиру — результат впечатлил даже мужа, хотя ему всегда что-то не нравится 😄 Окна в идеале!', name: 'Дарья Летягина', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Поддерживающая' },
  { text: 'Обращаюсь в эту компанию уже не первый раз. Уборка на высоте, всё идеально чисто и вкусно пахнет.', name: 'Евгений Бондаренко', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Генеральная' },
  { text: 'Татьяна, Никита — огромное вам спасибо за профессионализм! Спасибо за участие в масштабном проекте по генеральной уборке и за чуткое отношение к клиентам!', name: 'Марина Подседова', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Генеральная' },
  { text: 'После дня рождения дочери квартира была в конфетти, остатках еды и пятнах от напитков. Вызвали клининг — ребята приехали и за пару часов навели идеальный порядок. Спасибо за спасение выходных!', name: 'Григорий Ж.', role: 'Краснодар · Яндекс Карты', rating: 5, service: 'Генеральная' },
];

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

export default function ReviewsSection() {
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    setWidth(window.innerWidth);
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => setWidth(window.innerWidth), 100); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section id="reviews" className="bg-white py-20">
      <div className="max-w-[1240px] mx-auto px-5">

        <FadeIn className="text-center mb-14">
          <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            Отзывы
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            Нам доверяют <span className="text-[#A70000]">сотни клиентов</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[600px] mx-auto leading-[1.6]">
            Реальные отзывы жителей Краснодара с Яндекс Карт.{' '}
            <span className="whitespace-nowrap">Рейтинг 5.0 ★</span>
          </p>
        </FadeIn>

        <div
          className="flex justify-center gap-5 max-h-[700px] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={18} />
          {width >= 768  && <TestimonialsColumn testimonials={col2} duration={22} />}
          {width >= 1100 && <TestimonialsColumn testimonials={col3} duration={20} />}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://yandex.ru/maps/org/ultra_klining/230297027983/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-[#F1F5F9] text-[#1C2B3A] font-bold no-underline hover:border-[#A70000] hover:text-[#A70000] transition-colors duration-200"
          >
            Смотреть все отзывы на Яндекс Картах
          </a>
        </div>
      </div>
    </section>
  );
}
