import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'dark' | 'light';
}

export default function Breadcrumbs({ items, variant = 'dark' }: BreadcrumbsProps) {
  const isLight = variant === 'light';

  return (
    <nav aria-label="Хлебные крошки" className="mb-4">
      <ol className="flex flex-wrap gap-2 items-center list-none p-0 m-0 text-[13px] font-semibold">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'no-underline inline-flex items-center gap-1.5 transition-colors hover:text-[#A70000]',
                    isLight ? 'text-white/85' : 'text-[#64748B]',
                  )}
                >
                  {i === 0 && <Home size={14} aria-hidden="true" />}
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center gap-1.5',
                    isLight ? 'text-white' : 'text-[#1C2B3A]',
                  )}
                >
                  {i === 0 && <Home size={14} aria-hidden="true" />}
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  aria-hidden="true"
                  className={cn('shrink-0', isLight ? 'text-white/50' : 'text-[#CBD5E1]')}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
