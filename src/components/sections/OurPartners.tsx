import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';

const partners = [
  { name: 'DNS',                src: '/partners/dns-logo.png' },
  { name: 'Frank by Basta',     src: '/partners/frankbybasta.png' },
  { name: 'Russe D',            src: '/partners/Logo_russedsvg.png' },
  { name: 'МТС',                src: '/partners/mts-logo.png' },
  { name: 'Okay',               src: '/partners/okay-vertical-logo.png' },
  { name: 'Пятёрочка',          src: '/partners/Pyaterochka_2020svg.png' },
  { name: 'Сбер',               src: '/partners/sber-logo-rus-h-col-.png' },
  { name: 'Спортмастер',        src: '/partners/sportmaster-vertical.png' },
  { name: 'Победа честных цен', src: '/partners/pobeda-chestnih-cen.png' },
  { name: 'Вкусно — и точка',   src: '/partners/vkusno-i-tochka.png' },
  { name: 'FixPrice',           src: '/partners/fix-price-logo.png' },
  { name: 'Догма',              src: '/partners/dogma.png' },
];

const track = [...partners, ...partners];

export default function OurPartners() {
  return (
    <section className="bg-[#F9FAFB] py-[72px] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5">
        <FadeIn className="text-center mb-12">
          <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            Нам доверяют
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-3 tracking-[-0.02em]">
            Наши <span className="text-[#A70000]">партнёры</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[520px] mx-auto leading-[1.6]">
            Крупные компании и известные бренды выбирают<br />Ультра Клининг для поддержания чистоты
          </p>
        </FadeIn>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[#F9FAFB] to-transparent z-[2] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[#F9FAFB] to-transparent z-[2] pointer-events-none" />

        <div className="partners-track flex gap-8 w-max">
          {track.map((p, i) => (
            <div key={i} className="shrink-0 w-[240px] h-[120px] bg-white rounded-[18px] border border-[#E8EDF2] flex items-center justify-center px-8 py-5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#94A3B8] transition-all duration-200">
              <Image 
                src={p.src} 
                alt={`Логотип ${p.name}`} 
                width={176} 
                height={72} 
                className="max-h-[72px] object-contain w-auto h-auto" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
