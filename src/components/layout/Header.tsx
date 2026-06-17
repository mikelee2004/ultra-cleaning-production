'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Calculator } from 'lucide-react';
import { contacts } from '@/lib/contacts';
import { scrollToSection } from '@/lib/scrollTo';
import { cn } from '@/lib/cn';

const services = [
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

const navLinks = [
  { label: 'О нас',    scrollId: 'why-us' },
  { label: 'Новости',  href: '/news' },
  { label: 'Вакансии', href: 'https://rabota.cleankrd23.ru', external: true },
  { label: 'Отзывы',   scrollId: 'reviews' },
  { label: 'Контакты', scrollId: 'contacts' },
] as const;

export default function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router   = useRouter();

  /* ── Scroll shadow ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close on route change ─────────────────────────────────────────────── */
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when mobile menu open ────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Close dropdown on outside click / Escape ──────────────────────────── */
  useEffect(() => {
    if (!servicesOpen) return;
    const onMouse = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setServicesOpen(false); };
    document.addEventListener('mousedown', onMouse);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouse);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  const handleScroll = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id, (path) => router.push(path), pathname);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
        'backdrop-blur-md border-b',
        scrolled
          ? 'bg-white/98 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-transparent'
          : 'bg-white/95 border-black/5',
      )}
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-4">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="no-underline flex items-center gap-2"
          >
            <span className="font-extrabold text-lg md:text-[22px] text-[#1C2B3A] leading-none whitespace-nowrap">
              Ультра <span className="text-[#A70000]">Клининг</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
            {/* Services dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(v => !v)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-[#1C2B3A] font-semibold text-[15px] hover:text-[#A70000] transition-colors bg-transparent border-none cursor-pointer"
              >
                Услуги
                <ChevronDown
                  size={16}
                  className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] py-3 min-w-[280px] z-[100] border border-black/5">
                  {services.map(s => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-6 py-3 text-[#1C2B3A] text-sm font-medium no-underline hover:bg-[#F9FAFB] hover:text-[#A70000] transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map(link =>
              'href' in link ? (
                'external' in link && link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg text-[#1C2B3A] font-semibold text-[15px] no-underline hover:text-[#A70000] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-[#1C2B3A] font-semibold text-[15px] no-underline hover:text-[#A70000] transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <button
                  key={link.scrollId}
                  onClick={() => handleScroll(link.scrollId)}
                  className="px-3 py-2 rounded-lg text-[#1C2B3A] font-semibold text-[15px] hover:text-[#A70000] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${contacts.phone}`}
              aria-label="Позвонить"
              className="w-[38px] h-[38px] rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#1C2B3A] hover:bg-[#A70000] hover:text-white transition-all"
            >
              <Phone size={18} fill="currentColor" />
            </a>

            {/* VK */}
            <a href={contacts.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте"
              className="w-[38px] h-[38px] rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#1C2B3A] hover:bg-[#0077FF] hover:text-white transition-all">
              <VkIcon />
            </a>

            {/* WhatsApp */}
            <a href={contacts.whatsappWithMessage} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="w-[38px] h-[38px] rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#1C2B3A] hover:bg-[#25D366] hover:text-white transition-all">
              <WhatsAppIcon />
            </a>

            {/* Telegram */}
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
              className="w-[38px] h-[38px] rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#1C2B3A] hover:bg-[#229ED9] hover:text-white transition-all">
              <TelegramIcon />
            </a>

            <button
              onClick={() => handleScroll('calc')}
              className="px-[18px] py-[10px] rounded-xl bg-[#A70000] text-white font-bold text-sm whitespace-nowrap shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:-translate-y-px transition-transform border-none cursor-pointer"
            >
              Рассчитать цену
            </button>
          </div>

          {/* Mobile: phone + burger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={`tel:${contacts.phone}`}
              className="hidden md:flex items-center gap-2 no-underline text-[#1C2B3A] font-bold text-[15px]"
            >
              <Phone size={18} fill="currentColor" className="text-[#A70000]" />
              {contacts.phoneFormatted}
            </a>
            <button
              onClick={() => handleScroll('calc')}
              aria-label="Рассчитать стоимость"
              className="w-10 h-10 rounded-[10px] bg-[#A70000] text-white flex items-center justify-center border-none cursor-pointer"
            >
              <Calculator size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
              className="w-10 h-10 rounded-[10px] bg-[#1C2B3A] text-white flex items-center justify-center border-none cursor-pointer"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] max-h-[calc(100vh-64px)] overflow-y-auto px-5 py-6">
          {/* Phone */}
          <div className="mb-6">
            <a href={`tel:${contacts.phone}`} className="flex items-center gap-3 no-underline text-[#1C2B3A] font-extrabold text-xl mb-1">
              <Phone size={22} fill="currentColor" className="text-[#A70000]" />
              {contacts.phoneFormatted}
            </a>
            <p className="text-sm text-[#64748B] font-medium">Круглосуточно · Без выходных</p>
          </div>

          {/* Social */}
          <div className="flex gap-3 mb-6">
            <a href={contacts.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте"
              className="w-11 h-11 rounded-xl bg-[#0077FF] flex items-center justify-center text-white">
              <VkIcon size={22} />
            </a>
            <a href={contacts.whatsappWithMessage} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center text-white">
              <WhatsAppIcon size={22} />
            </a>
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
              className="w-11 h-11 rounded-xl bg-[#229ED9] flex items-center justify-center text-white">
              <TelegramIcon size={22} />
            </a>
          </div>

          {/* Services */}
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-3">Наши услуги</p>
          <div className="grid grid-cols-1 gap-1 mb-6">
            {services.map(s => (
              <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl bg-[#F8FAFC] text-[#1C2B3A] text-base font-semibold no-underline">
                {s.label}
              </Link>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3 mb-6">
            {navLinks.map(link =>
              'href' in link ? (
                'external' in link && link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-[14px] rounded-xl border border-[#E2E8F0] text-[#1C2B3A] text-base font-semibold no-underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-[14px] rounded-xl border border-[#E2E8F0] text-[#1C2B3A] text-base font-semibold no-underline">
                    {link.label}
                  </Link>
                )
              ) : (
                <button key={link.scrollId} onClick={() => handleScroll(link.scrollId)}
                  className="w-full px-4 py-[14px] rounded-xl border border-[#E2E8F0] text-[#1C2B3A] text-base font-semibold text-left bg-transparent cursor-pointer">
                  {link.label}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => handleScroll('calc')}
            className="w-full py-4 rounded-xl bg-[#A70000] text-white font-bold text-base text-center shadow-[0_8px_20px_rgba(220,38,38,0.2)] border-none cursor-pointer"
          >
            Рассчитать стоимость
          </button>
        </div>
      )}
    </header>
  );
}

/* ── SVG Icons ──────────────────────────────────────────────────────────────── */
function VkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 7.932c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
