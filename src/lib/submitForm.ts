export const WORKER_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://appointment.mike-lee-software-2004.workers.dev/submit';

export interface FormPayload {
  name: string;
  phone: string;
  service: string;
  calculator?: CalculatorData;
}

export interface CalculatorData {
  objectType: string;
  objectTypeLabel: string;
  area: number;
  cleaningType: string;
  cleaningTypeLabel: string;
  extras: ExtraItem[];
  totalPrice: number;
}

export interface ExtraItem {
  id: string;
  label: string;
  price: number;
  count?: number;
}

export async function submitForm(payload: FormPayload): Promise<void> {
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки: ${response.status}`);
  }
}
