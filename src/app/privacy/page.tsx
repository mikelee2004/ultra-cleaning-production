import type { Metadata } from 'next';
import PrivacyPage from '@/components/pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Ультра Клининг',
  description:
    'Политика конфиденциальности клининговой компании Ультра Клининг. Порядок обработки и защиты персональных данных пользователей сайта.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.cleankrd23.ru/privacy' },
};

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
