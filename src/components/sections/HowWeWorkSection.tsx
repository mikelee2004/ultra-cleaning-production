import FadeIn from '@/components/ui/FadeIn';

const steps = [
  { num: '01', icon: '📝', title: 'Заявка',  desc: 'Звонок, WhatsApp или форма на сайте — принимаем круглосуточно' },
  { num: '02', icon: '💬', title: 'Расчёт',  desc: 'Менеджер уточняет детали, называет цену и согласует время' },
  { num: '03', icon: '🚗', title: 'Выезд',   desc: 'Команда приезжает вовремя со всем оборудованием и химией' },
  { num: '04', icon: '🧹', title: 'Уборка',  desc: 'Работаем строго по чек-листу, используем эко-химию' },
  { num: '05', icon: '✅', title: 'Приёмка', desc: 'Проверяем результат вместе. Исправим на месте, если нужно' },
];

export default function HowWeWorkSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="max-w-[1240px] mx-auto px-5">

        <FadeIn className="text-center mb-16">
          <span className="inline-block bg-[#FEE2E2] text-[#A70000] rounded-full px-[18px] py-1.5 text-sm font-extrabold uppercase tracking-[0.05em] mb-4">
            Процесс работы
          </span>
          <h2 className="text-[clamp(32px,5vw,48px)] font-black text-[#1C2B3A] mb-4 tracking-[-0.02em]">
            5 шагов до идеальной <span className="text-[#A70000]">чистоты</span>
          </h2>
          <p className="text-[clamp(16px,2vw,18px)] text-[#64748B] max-w-[500px] mx-auto leading-[1.6]">
            Прозрачный процесс без лишних хлопот — от вашей заявки до блестящего результата
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.07}>
              <div className="relative bg-white rounded-3xl p-8 border border-[#F1F5F9]">
                <div className="absolute -top-3 left-8 w-8 h-8 rounded-[10px] bg-[#A70000] text-white flex items-center justify-center text-sm font-extrabold shadow-[0_4px_12px_rgba(220,38,38,0.3)]">
                  {step.num}
                </div>
                <div className="text-4xl mb-5 mt-2">{step.icon}</div>
                <h3 className="text-xl font-extrabold text-[#1C2B3A] mb-3">{step.title}</h3>
                <p className="text-sm text-[#64748B] leading-[1.6]">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
