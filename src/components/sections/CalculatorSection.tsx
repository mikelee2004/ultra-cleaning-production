'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, ChevronDown, Check } from 'lucide-react';
import { toast } from 'sonner';
import { submitForm, type CalculatorData } from '@/lib/submitForm';
import { useFormFields } from '@/hooks/useFormFields';
import { cn } from '@/lib/cn';

type ObjectType   = 'apartment' | 'house' | 'office' | 'other';
type CleaningType = 'general' | 'regular' | 'renovation' | 'post-holiday' | 'post-death' | 'post-emergency' | 'commercial';

const BASE_PRICES: Record<CleaningType, Record<ObjectType, number>> = {
  general:          { apartment: 150, house: 150, office: 150, other: 150 },
  regular:          { apartment: 100, house: 100, office: 100, other: 100 },
  renovation:       { apartment: 200, house: 200, office: 200, other: 200 },
  'post-holiday':   { apartment: 200, house: 200, office: 200, other: 200 },
  'post-death':     { apartment: 300, house: 300, office: 300, other: 300 },
  'post-emergency': { apartment: 350, house: 350, office: 350, other: 350 },
  commercial:       { apartment: 180, house: 180, office: 180, other: 180 },
};

const CLEANING_LABELS: Record<CleaningType, string> = {
  general:          'Генеральная уборка',
  regular:          'Поддерживающая уборка',
  renovation:       'Уборка после ремонта',
  'post-holiday':   'Уборка после праздника',
  'post-death':     'Уборка после смерти',
  'post-emergency': 'Уборка после ЧС (потоп, пожар)',
  commercial:       'Коммерческая уборка',
};

const OBJECT_LABELS: Record<ObjectType, string> = { apartment: 'Квартира', house: 'Дом', office: 'Офис', other: 'Другое' };

const EXTRAS = [
  { id: 'windows',            label: 'Мойка окон',                   price: 400,  unit: '/ створка' },
  { id: 'ozone',              label: 'Озонирование помещения',        price: 70,   unit: '/ м²' },
  { id: 'oven',               label: 'Помыть духовку / гриль',        price: 1000, unit: '' },
  { id: 'fridge',             label: 'Помыть холодильник',            price: 1000, unit: '' },
  { id: 'microwave',          label: 'Помыть СВЧ',                    price: 500,  unit: '' },
  { id: 'hood',               label: 'Чистка вытяжки + фильтров',     price: 1000, unit: '' },
  { id: 'dishes',             label: 'Помыть посуду',                 price: 800,  unit: '' },
  { id: 'ironing',            label: 'Глажка',                        price: 500,  unit: '/ час' },
  { id: 'trash',              label: 'Вынести мусор',                 price: 800,  unit: '' },
  { id: 'curtains_off',       label: 'Снять шторы',                   price: 500,  unit: '' },
  { id: 'curtains_on',        label: 'Повесить шторы',                price: 500,  unit: '' },
  { id: 'furniture',          label: 'Вынести тяжёлую мебель',        price: 5000, unit: '' },
  { id: 'chandelier',         label: 'Мойка люстры (стандартная)',    price: 800,  unit: '' },
  { id: 'chandelier_crystal', label: 'Мойка люстры (хрустальная)',    price: 1300, unit: '' },
  { id: 'radiator',           label: 'Мойка радиаторов отопления',    price: 350,  unit: '/ шт' },
];

/* ── Counter sub-component ─────────────────────────────────────────────────── */
function Counter({ label, value, onDec, onInc }: { label: string; value: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#FEF2F2] rounded-b-xl border border-[#A70000] border-t-0">
      <span className="text-[13px] text-[#A70000] font-semibold">{label}</span>
      <div className="flex items-center gap-2 ml-auto">
        <button aria-label={`Уменьшить: ${label}`} onClick={onDec} className="w-7 h-7 rounded-lg border border-[#A70000] bg-white text-[#A70000] font-extrabold text-base cursor-pointer hover:bg-[#FEE2E2] transition-colors">−</button>
        <span className="font-extrabold text-[#1C2B3A] min-w-[24px] text-center">{value}</span>
        <button aria-label={`Увеличить: ${label}`} onClick={onInc} className="w-7 h-7 rounded-lg border border-[#A70000] bg-[#A70000] text-white font-extrabold text-base cursor-pointer hover:bg-[#8B0000] transition-colors">+</button>
      </div>
    </div>
  );
}

export default function CalculatorSection() {
  const [objectType,   setObjectType]   = useState<ObjectType>('apartment');
  const [area,         setArea]         = useState(50);
  const [cleaningType, setCleaningType] = useState<CleaningType>('general');
  const [extras,       setExtras]       = useState<Set<string>>(new Set());
  const [windowCount,  setWindowCount]  = useState(1);
  const [radiatorCount, setRadiatorCount] = useState(1);
  const [chandelierCount, setChandelierCount] = useState(1);
  const [crystalCount, setCrystalCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const { name, phone, handleNameChange, handlePhoneChange, validateName, validatePhone } = useFormFields();

  const toggleExtra = (id: string) => {
    setExtras(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const price = useMemo(() => {
    const windowPrice = cleaningType === 'renovation' ? 600 : 400;
    const base = BASE_PRICES[cleaningType][objectType] * area;
    const extrasTotal = EXTRAS.filter(e => extras.has(e.id)).reduce((sum, e) => {
      if (e.id === 'windows')            return sum + windowPrice * windowCount;
      if (e.id === 'ozone')              return sum + e.price * area;
      if (e.id === 'radiator')           return sum + e.price * radiatorCount;
      if (e.id === 'chandelier')         return sum + e.price * chandelierCount;
      if (e.id === 'chandelier_crystal') return sum + e.price * crystalCount;
      return sum + e.price;
    }, 0);
    return base + extrasTotal;
  }, [objectType, area, cleaningType, extras, windowCount, radiatorCount, chandelierCount, crystalCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName() || !validatePhone()) return;
    setLoading(true);

    const windowPrice = cleaningType === 'renovation' ? 600 : 400;
    const selectedExtras = EXTRAS.filter(ex => extras.has(ex.id)).map(ex => {
      let count: number | undefined;
      let finalPrice = ex.price;
      if (ex.id === 'windows')            { count = windowCount;    finalPrice = windowPrice * windowCount; }
      else if (ex.id === 'ozone')         { finalPrice = ex.price * area; }
      else if (ex.id === 'radiator')      { count = radiatorCount;  finalPrice = ex.price * radiatorCount; }
      else if (ex.id === 'chandelier')    { count = chandelierCount; finalPrice = ex.price * chandelierCount; }
      else if (ex.id === 'chandelier_crystal') { count = crystalCount; finalPrice = ex.price * crystalCount; }
      return { id: ex.id, label: ex.label, price: finalPrice, ...(count !== undefined ? { count } : {}) };
    });

    const calculatorData: CalculatorData = {
      objectType, objectTypeLabel: OBJECT_LABELS[objectType],
      area, cleaningType, cleaningTypeLabel: CLEANING_LABELS[cleaningType],
      extras: selectedExtras, totalPrice: price,
    };

    try {
      await submitForm({ name: name.value, phone: phone.value, service: 'Калькулятор (Главная страница)', calculator: calculatorData });
      setSubmitted(true);
    } catch {
      toast.error('Не удалось отправить заявку. Попробуйте позвонить нам напрямую.');
    } finally {
      setLoading(false);
    }
  };

  const windowPrice = cleaningType === 'renovation' ? 600 : 400;

  return (
    <section id="calc" className="bg-white py-20">
      <div className="max-w-[1100px] mx-auto px-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            <Calculator size={16} /> Калькулятор
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            Узнайте цену за <span className="text-[#A70000]">30 секунд</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[500px] mx-auto leading-[1.6]">
            Настройте параметры — стоимость обновится мгновенно
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Settings ─────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Object type */}
            <div>
              <label className="block text-sm font-bold text-[#1C2B3A] uppercase tracking-[0.05em] mb-4">Что убираем?</label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.entries(OBJECT_LABELS) as [ObjectType, string][]).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setObjectType(id)}
                    className={cn(
                      'py-3.5 rounded-xl border-2 font-bold cursor-pointer transition-colors duration-150',
                      objectType === id
                        ? 'border-[#A70000] bg-[#FEE2E2] text-[#A70000]'
                        : 'border-[#F1F5F9] bg-[#F8FAFC] text-[#64748B] hover:border-[#A70000]/40',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-[#1C2B3A] uppercase tracking-[0.05em]">Площадь</label>
                <span className="text-lg font-extrabold text-[#A70000]">{area} м²</span>
              </div>
              <input type="range" min="10" max="500" value={area} onChange={e => setArea(Number(e.target.value))} className="w-full h-1.5 rounded cursor-pointer" />
            </div>

            {/* Cleaning type */}
            <div>
              <label className="block text-sm font-bold text-[#1C2B3A] uppercase tracking-[0.05em] mb-4">Тип уборки</label>
              <div className="relative">
                <select
                  value={cleaningType}
                  onChange={e => setCleaningType(e.target.value as CleaningType)}
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#F1F5F9] bg-[#F8FAFC] text-[#1C2B3A] font-bold appearance-none cursor-pointer text-base focus:outline-none focus:border-[#A70000]"
                >
                  {(Object.entries(CLEANING_LABELS) as [CleaningType, string][]).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]" />
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="block text-sm font-bold text-[#1C2B3A] uppercase tracking-[0.05em] mb-4">Дополнительно</label>
              <div className="flex flex-col gap-2">
                {EXTRAS.map(extra => {
                  const active = extras.has(extra.id);
                  const displayPrice = extra.id === 'ozone' ? `${extra.price * area} ₽`
                    : extra.id === 'windows'            ? `${windowPrice * windowCount} ₽`
                    : extra.id === 'radiator'           ? `${extra.price * radiatorCount} ₽`
                    : extra.id === 'chandelier'         ? `${extra.price * chandelierCount} ₽`
                    : extra.id === 'chandelier_crystal' ? `${extra.price * crystalCount} ₽`
                    : `${extra.price.toLocaleString('ru-RU')} ₽${extra.unit ? ' ' + extra.unit : ''}`;

                  return (
                    <div key={extra.id}>
                      <button
                        onClick={() => toggleExtra(extra.id)}
                        className={cn(
                          'w-full flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold cursor-pointer transition-colors duration-150 text-left',
                          active ? 'border-[#A70000] bg-[#FEE2E2] text-[#A70000]' : 'border-[#F1F5F9] bg-white text-[#64748B] hover:border-[#A70000]/40',
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            'w-[18px] h-[18px] rounded shrink-0 border-2 flex items-center justify-center text-white',
                            active ? 'border-[#A70000] bg-[#A70000]' : 'border-[#CBD5E1] bg-transparent',
                          )}>
                            {active && <Check size={12} strokeWidth={4} />}
                          </div>
                          {extra.label}
                        </div>
                        <span className={cn('text-[13px] font-bold whitespace-nowrap', active ? 'text-[#A70000]' : 'text-[#94A3B8]')}>
                          {displayPrice}
                        </span>
                      </button>

                      {extra.id === 'windows'            && active && <Counter label="Количество створок:"         value={windowCount}    onDec={() => setWindowCount(Math.max(1, windowCount - 1))}       onInc={() => setWindowCount(windowCount + 1)} />}
                      {extra.id === 'radiator'           && active && <Counter label="Количество радиаторов:"      value={radiatorCount}  onDec={() => setRadiatorCount(Math.max(1, radiatorCount - 1))}   onInc={() => setRadiatorCount(radiatorCount + 1)} />}
                      {extra.id === 'chandelier'         && active && <Counter label="Количество люстр:"           value={chandelierCount} onDec={() => setChandelierCount(Math.max(1, chandelierCount - 1))} onInc={() => setChandelierCount(chandelierCount + 1)} />}
                      {extra.id === 'chandelier_crystal' && active && <Counter label="Количество хрустальных люстр:" value={crystalCount} onDec={() => setCrystalCount(Math.max(1, crystalCount - 1))}     onInc={() => setCrystalCount(crystalCount + 1)} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Result card ──────────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-[100px] h-fit">
            <div className="bg-[#1C2B3A] rounded-[32px] p-10 text-white shadow-[0_20px_50px_rgba(28,43,58,0.2)]">
              <h4 className="text-sm font-bold text-white/60 uppercase tracking-[0.1em] mb-8">Итоговая стоимость</h4>

              <div className="mb-10">
                <div className="text-[clamp(36px,4vw,56px)] font-black text-white leading-none">
                  ~{price.toLocaleString('ru-RU')} ₽
                </div>
                <p className="text-white/50 text-sm mt-3">Окончательная цена после осмотра</p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <input
                      aria-label="Ваше имя"
                      placeholder="Ваше имя"
                      value={name.value}
                      onChange={e => handleNameChange(e.target.value)}
                      className={cn(
                        'w-full px-5 py-4 rounded-2xl bg-white/10 text-white text-base placeholder:text-white/40 outline-none transition-colors',
                        name.error ? 'border border-[#ff6b6b]' : 'border border-white/10 focus:border-white/30',
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
                        'w-full px-5 py-4 rounded-2xl bg-white/10 text-white text-base placeholder:text-white/40 outline-none transition-colors',
                        phone.error ? 'border border-[#ff6b6b]' : 'border border-white/10 focus:border-white/30',
                      )}
                    />
                    {phone.error && <span className="text-xs text-[#ff6b6b] pl-1">{phone.error}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 py-[18px] rounded-2xl bg-[#A70000] text-white font-extrabold text-base border-none cursor-pointer shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Отправка...' : 'Забронировать уборку'}
                  </button>

                  <p className="text-xs text-white/40 text-center mt-3">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              ) : (
                <div className="text-center py-5">
                  <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center mx-auto mb-5 text-white">
                    <Check size={32} />
                  </div>
                  <h5 className="text-xl font-extrabold mb-3">Заявка принята!</h5>
                  <p className="text-white/70 leading-[1.5]">Мы перезвоним вам в течение 5 минут для подтверждения.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
