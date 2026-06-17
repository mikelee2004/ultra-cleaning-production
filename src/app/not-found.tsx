import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Страница не найдена | Ультра Клининг',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center bg-white">
      <div className="text-[120px] font-black text-[#F1F5F9] leading-none select-none mb-4">404</div>
      <h1 className="text-3xl md:text-4xl font-black text-[#1C2B3A] mb-4">Страница не найдена</h1>
      <p className="text-[#64748B] text-lg mb-10 max-w-md">
        Возможно, страница была удалена или вы перешли по неверной ссылке.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-4 rounded-2xl bg-[#A70000] text-white font-bold text-lg no-underline shadow-[0_10px_25px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 transition-transform"
      >
        На главную
      </Link>
    </div>
  );
}
