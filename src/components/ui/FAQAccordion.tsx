'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FAQAccordionProps {
  faqs: { q: string; a: string }[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={cn(
            'rounded-2xl border-2 overflow-hidden transition-colors duration-200',
            open === i ? 'border-[#A70000] bg-[#FEE2E2]' : 'border-[#F0F4F8] bg-white',
          )}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between px-5 py-4 bg-transparent border-none cursor-pointer text-left"
          >
            <span className={cn('text-base font-bold', open === i ? 'text-[#A70000]' : 'text-[#1C2B3A]')}>
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                'shrink-0 ml-3 transition-all duration-300',
                open === i ? 'rotate-180 text-[#A70000]' : 'text-[#94A3B8]',
              )}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="px-5 pb-5 text-[#64748B] text-sm leading-[1.7]">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
