'use client';

import { useState } from 'react';
import { Phone, Check, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { submitForm } from '@/lib/submitForm';
import { useFormFields } from '@/hooks/useFormFields';
import { contacts } from '@/lib/contacts';
import { cn } from '@/lib/cn';
import FadeIn from '@/components/ui/FadeIn';

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const { name, phone, handleNameChange, handlePhoneChange, validateName, validatePhone } = useFormFields();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName() || !validatePhone()) return;
    setLoading(true);
    try {
      await submitForm({ name: name.value, phone: phone.value, service: 'Главная страница' });
      setSubmitted(true);
    } catch {
      toast.error('Не удалось отправить заявку. Попробуйте позвонить нам напрямую.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts-form" className="relative bg-[#1C2B3A] py-[100px] overflow-hidden">
      <div aria-hidden="true" className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] rounded-full bg-[#DC2626]/10 blur-[80px] pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] rounded-full bg-[#DC2626]/5 blur-[60px] pointer-events-none" />

      <div className="relative z-[1] max-w-[1100px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <FadeIn direction="left">
            <h2 className="text-[clamp(32px,5vw,56px)] font-black text-white mb-5 leading-[1.1] tracking-[-0.02em]">
              Закажите уборку<br /><span className="text-[#A70000]">прямо сейчас</span>
            </h2>
            <p className="text-xl text-white/70 mb-10 leading-[1.6]">
              Оставьте заявку — перезвоним в течение 5 минут для консультации и расчёта точной стоимости.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${contacts.phone}`} className="flex items-center justify-center gap-3 w-[260px] bg-[#A70000] rounded-2xl px-6 py-4 no-underline text-white font-bold text-base shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 transition-transform duration-200">
                <Phone size={20} fill="currentColor" />{contacts.phoneFormatted}
              </a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-[260px] bg-[#25D366] rounded-2xl px-6 py-4 no-underline text-white font-bold text-base shadow-[0_8px_20px_rgba(37,211,102,0.2)] hover:-translate-y-0.5 transition-transform duration-200">
                <MessageCircle size={20} fill="currentColor" />Написать в WhatsApp
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="bg-white rounded-[32px] p-6 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3 className="text-2xl font-extrabold text-[#1C2B3A] mb-2">Быстрая заявка</h3>
                  <div className="flex flex-col gap-1.5">
                    <input aria-label="Ваше имя" placeholder="Ваше имя" value={name.value} onChange={e => handleNameChange(e.target.value)}
                      className={cn('w-full px-6 py-[18px] rounded-2xl bg-[#F8FAFC] text-[#1C2B3A] text-base font-medium border-2 outline-none transition-colors', name.error ? 'border-[#A70000]' : 'border-[#F1F5F9] focus:border-[#A70000]/40')} />
                    {name.error && <span className="text-xs text-[#A70000] pl-1">{name.error}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input type="tel" aria-label="Номер телефона" placeholder="+7 (___) ___-__-__" value={phone.value} onChange={e => handlePhoneChange(e.target.value)}
                      className={cn('w-full px-6 py-[18px] rounded-2xl bg-[#F8FAFC] text-[#1C2B3A] text-base font-medium border-2 outline-none transition-colors', phone.error ? 'border-[#A70000]' : 'border-[#F1F5F9] focus:border-[#A70000]/40')} />
                    {phone.error && <span className="text-xs text-[#A70000] pl-1">{phone.error}</span>}
                  </div>
                  <button type="submit" disabled={loading} className="mt-2 py-[18px] rounded-2xl bg-[#A70000] text-white font-extrabold text-lg border-none cursor-pointer shadow-[0_10px_25px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                  <p className="text-[13px] text-[#94A3B8] text-center mt-3">Отправляя форму, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              ) : (
                <div className="text-center py-5">
                  <div className="w-20 h-20 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto mb-6 shadow-[0_10px_25px_rgba(16,185,129,0.3)]">
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1C2B3A] mb-3">Спасибо!</h3>
                  <p className="text-lg text-[#64748B] leading-[1.6]">Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
