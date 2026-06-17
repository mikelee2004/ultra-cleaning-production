import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';

const equipment = [
  { title: 'Пылесосы всех типов Karcher',         desc: 'Для сухой и влажной уборки любого объёма и степени загрязнения',                                              src: '/equipment/pilesos.jpg' },
  { title: 'Пароочистители Karcher',               desc: 'Идеально для удаления застарелых загрязнений',                                                                src: '/equipment/paroochistitel.jpg' },
  { title: 'Поломоечные и роторные машины',        desc: 'Универсальные поломоечные машины для всех типов покрытий Kedi и Viper',                                       src: '/equipment/vacum.webp' },
  { title: 'Премиальная химия от мировых брендов', desc: 'Никакой бытовой химии! Работаем только с профессиональной химией от ProBrite, Kiehl, Unger',                 src: '/equipment/spray.webp' },
  { title: 'Качественный инвентарь',               desc: 'Износостойкие скребки и ТОПовые инструменты на все случаи уборки',                                           src: '/equipment/shetka.jpg' },
  { title: 'Свежий инвентарь',                     desc: 'Тряпки бренда Vileda и смена всего текстиля каждые 7 дней',                                                  src: '/equipment/tryapka.jpg' },
];

export default function WhatWeUseSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="max-w-[1240px] mx-auto px-5">

        <FadeIn className="text-center mb-14">
          <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            Наше оборудование
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            Чем мы <span className="text-[#A70000]">работаем</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[600px] mx-auto leading-[1.6]">
            Только профессиональная техника и сертифицированная химия — никакого бытового инвентаря
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {equipment.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05} className="h-full">
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#F1F5F9] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] hover:border-[#E2E8F0] transition-all duration-200 h-full">
                <div className="w-full sm:w-[180px] shrink-0 flex items-center justify-center order-first sm:order-last">
                  <Image 
                    src={item.src} 
                    alt={`${item.title} — оборудование Ультра Клининг`} 
                    width={180} 
                    height={160} 
                    className="object-contain max-h-[160px] w-auto h-auto" 
                    loading="lazy" 
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-extrabold text-[#1C2B3A] mb-2.5 leading-snug">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-[1.6]">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
