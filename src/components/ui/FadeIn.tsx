'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Задержка в секундах (default: 0) */
  delay?: number;
  /** Направление появления (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Смещение в px (default: 20) */
  distance?: number;
  /** Duration в секундах (default: 0.5) */
  duration?: number;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.5,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  // amount: 0.1 — триггер при 10% видимости, срабатывает раньше
  // once: true — анимация только один раз, не реверсируется при скролле назад
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const offsets = {
    up:    { x: 0,         y: distance  },
    down:  { x: 0,         y: -distance },
    left:  { x: distance,  y: 0         },
    right: { x: -distance, y: 0         },
    none:  { x: 0,         y: 0         },
  };

  const { x, y } = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // плавный ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
