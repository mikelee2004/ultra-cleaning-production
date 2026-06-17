import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  rating: number;
  service: string;
};

export function TestimonialsColumn({ testimonials, duration = 15 }: { testimonials: Testimonial[]; duration?: number }) {
  return (
    <div className="overflow-hidden shrink-0 w-[340px]">
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-5 pb-5"
      >
        {[0, 1].map(idx => (
          <div key={idx} className="flex flex-col gap-5">
            {testimonials.map(({ text, name, role, rating, service }, i) => (
              <div key={i} className="bg-white rounded-[20px] p-6 border border-[#F1F5F9] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex gap-[3px] mb-3.5">
                  {Array.from({ length: rating }).map((_, s) => (
                    <Star key={s} size={14} className="fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-sm text-[#475569] leading-[1.65] mb-[18px]">«{text}»</p>
                <div className="pt-4 border-t border-[#F1F5F9]">
                  <div className="font-bold text-sm text-[#1C2B3A]">{name}</div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">{role}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
