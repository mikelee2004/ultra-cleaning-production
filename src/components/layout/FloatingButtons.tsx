'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { contacts } from '@/lib/contacts';
import { cn } from '@/lib/cn';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-[999]">
      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
        aria-label="Прокрутить наверх"
        className={cn(
          'w-14 h-14 rounded-full bg-white text-[#1C2B3A] border-none shadow-[0_4px_16px_rgba(0,0,0,0.15)]',
          'flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200',
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        <ArrowUp size={24} />
      </button>

      {/* WhatsApp */}
      <a
        href={contacts.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center no-underline shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle size={30} fill="currentColor" />
      </a>

      {/* Phone */}
      <a
        href={`tel:${contacts.phone}`}
        aria-label="Позвонить"
        className="w-14 h-14 rounded-full bg-[#A70000] text-white flex items-center justify-center no-underline shadow-[0_4px_16px_rgba(220,38,38,0.3)] hover:scale-110 transition-transform duration-200"
      >
        <Phone size={28} fill="currentColor" />
      </a>
    </div>
  );
}
