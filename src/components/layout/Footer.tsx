'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { contacts } from '@/lib/contacts';

const footerServices = [
  { label: 'Генеральная уборка',      href: '/generalcleaning' },
  { label: 'Поддерживающая уборка',   href: '/regularcleaning' },
  { label: 'Уборка после праздника',  href: '/postholidaycleaning' },
  { label: 'Уборка после ремонта',    href: '/postrenovationcleaning' },
  { label: 'Химчистка мебели',        href: '/furniturecleaning' },
  { label: 'Мытьё окон',              href: '/windowcleaning' },
  { label: 'Коммерческая уборка',     href: '/commercialcleaning' },
  { label: 'Уборка после пожара',     href: '/firedamagecleaning' },
  { label: 'Озонирование помещений',  href: '/ozonation' },
];

const socials = [
  { href: contacts.whatsapp,  label: 'WhatsApp',  bg: '#25D366', icon: <WhatsAppIcon /> },
  { href: contacts.vk,        label: 'ВКонтакте', bg: '#0077FF', icon: <VkIcon /> },
  { href: contacts.telegram,  label: 'Telegram',  bg: '#0088cc', icon: <TelegramIcon /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacts" className="bg-[#1C2B3A] text-white pt-20 pb-10">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-20">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-6 no-underline">
              <Image
                src="/ultra-cleaning-logo.svg"
                alt="Логотип Ультра Клининг"
                width={40}
                height={40}
                className="shrink-0"
              />
              <span className="font-extrabold text-[22px] text-white leading-none whitespace-nowrap">
                Ультра <span className="text-[#A70000]">Клининг</span>
              </span>
            </Link>
            <p className="text-[15px] leading-[1.7] text-white/60 mb-8">
              Профессиональная клининговая компания в Краснодаре. Делаем мир чище, а вашу жизнь — проще. Работаем 24/7.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white no-underline hover:-translate-y-1 transition-all duration-200"
                  style={{ '--hover-bg': s.bg } as React.CSSProperties}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = s.bg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* О нас */}
          <div>
            <h4 className="font-extrabold text-base text-white uppercase tracking-widest mb-6">О нас</h4>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#services';
                  }
                }}
                className="text-left text-white/50 text-[15px] font-medium hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                Услуги
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('calc');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#calc';
                  }
                }}
                className="text-left text-white/50 text-[15px] font-medium hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                Калькулятор услуг
              </button>
              <a
                href="https://rabota.cleankrd23.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-[15px] font-medium no-underline hover:text-white transition-colors"
              >
                Вакансии
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-extrabold text-base text-white uppercase tracking-widest mb-6">Услуги</h4>
            <div className="flex flex-col gap-3">
              {footerServices.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-white/50 text-[15px] font-medium no-underline hover:text-white transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-extrabold text-base text-white uppercase tracking-widest mb-6">Контакты</h4>
            <div className="flex flex-col gap-5">
              <a
                href={`tel:${contacts.phone}`}
                className="flex items-center gap-3 no-underline text-white text-lg font-extrabold hover:text-white/80 transition-colors"
              >
                <Phone size={20} className="text-[#A70000] shrink-0" fill="currentColor" />
                {contacts.phoneFormatted}
              </a>
              <a
                href="mailto:commerce@uclea.ru"
                className="flex items-center gap-3 no-underline text-white text-lg font-extrabold hover:text-white/80 transition-colors"
              >
                <Mail size={20} className="text-[#A70000] shrink-0" />
                <span>commerce@uclea.ru</span>
              </a>
              <div className="flex items-start gap-3 text-white/60 text-[15px]">
                <MapPin size={20} className="text-[#A70000] shrink-0 mt-0.5" />
                <span>{contacts.address}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-[15px]">
                <Clock size={20} className="text-[#A70000] shrink-0" />
                <span>Круглосуточно 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap justify-between gap-5 text-sm text-white/40">
          <div className="flex flex-col gap-1">
            <span>© {currentYear} Клининговая компания «Ультра Клининг». Все права защищены.</span>
            <span className="text-xs text-white/25">ИП Молчанов Никита Олегович · ИНН 236103451956 · ОГРНИП 325237500215030</span>
          </div>
          <div className="flex gap-6">
            <Link href="/offer" className="text-white/40 no-underline hover:text-white transition-colors">
              Публичная оферта
            </Link>
            <Link href="/privacy" className="text-white/40 no-underline hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <a
              href="https://scaleangel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 no-underline hover:text-white transition-colors"
            >
              Разработка: ScaleAngel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 7.932c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
