import {Metadata} from 'next';
import OfferPage from '@/components/pages/OfferPage';

export const metadata: Metadata = {
    title: "Публичная оферта УльтраКлининг Краснодар",
    description: 
        "Публичная оферта клининговой компании УльтраКлининг по городу Краснодар",
    robots: {index: false, follow: false},
    alternates: { canonical: 'https://www.cleankrd23.ru/offer' },
}

export default function OfferRoute() {
    return <OfferPage />;
}