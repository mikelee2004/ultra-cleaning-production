'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { submitForm } from '@/lib/submitForm';
import { useFormFields } from '@/hooks/useFormFields';
import { cn } from '@/lib/cn';

interface ServiceFormProps {
  serviceName: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export default function ServiceForm({
  serviceName,
  title = 'Оставить заявку',
  subtitle = 'Оставьте номер и мы перезвоним вам в ближайшее время.',
  ctaLabel = 'Отправить заявку',
}: ServiceFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, phone, handleNameChange, handlePhoneChange, validateName, validatePhone } = useFormFields();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName() || !validatePhone()) return;
    setLoading(true);
    try {
      await submitForm({ name: name.value, phone: phone.value, service: serviceName });
      setSubmitted(true);
    } catch {
      toast.error('Не удалось отправить заявку. Попробуйте позвонить нам напрямую.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-5">
        <div className="w-[72px] h-[72px] rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto mb-6 shadow-[0_10px_25px_rgba(16,185,129,0.3)]">
          <Check size={36} strokeWidth={3} />
        </div>
        <h3 className="text-[26px] font-black mb-3">Заявка принята!</h3>
        <p className="text-white/70 leading-[1.6]">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-[28px] font-black mb-2">{title}</h3>
      {subtitle && <p className="text-white/60 mb-4 leading-[1.5]">{subtitle}</p>}

      <div className="flex flex-col gap-1">
        <input
          aria-label="Ваше имя"
          placeholder="Ваше имя"
          value={name.value}
          onChange={e => handleNameChange(e.target.value)}
          className={cn(
            'w-full px-6 py-[18px] rounded-2xl bg-white/10 text-white text-base placeholder:text-white/40 outline-none transition-colors border',
            name.error ? 'border-[#ff6b6b]' : 'border-white/10 focus:border-white/30',
          )}
        />
        {name.error && <span className="text-xs text-[#ff6b6b] pl-1">{name.error}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="tel"
          aria-label="Номер телефона"
          placeholder="+7 (___) ___-__-__"
          value={phone.value}
          onChange={e => handlePhoneChange(e.target.value)}
          className={cn(
            'w-full px-6 py-[18px] rounded-2xl bg-white/10 text-white text-base placeholder:text-white/40 outline-none transition-colors border',
            phone.error ? 'border-[#ff6b6b]' : 'border-white/10 focus:border-white/30',
          )}
        />
        {phone.error && <span className="text-xs text-[#ff6b6b] pl-1">{phone.error}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 py-[18px] rounded-2xl bg-[#A70000] text-white font-extrabold text-lg border-none cursor-pointer shadow-[0_10px_25px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Отправка...' : ctaLabel}
      </button>

      <p className="text-xs text-white/40 text-center mt-2">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}
