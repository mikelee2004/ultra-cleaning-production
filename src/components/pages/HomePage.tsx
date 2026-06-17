'use client';

import { useEffect } from 'react';
import { handlePendingScroll } from '@/lib/scrollTo';
import HeroSection       from '@/components/sections/HeroSection';
import SegmentSection    from '@/components/sections/SegmentSection';
import OurPartners       from '@/components/sections/OurPartners';
import ServicesSection   from '@/components/sections/ServicesSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import WhatWeUseSection  from '@/components/sections/WhatWeUseSection';
import CalculatorSection from '@/components/sections/CalculatorSection';
import HowWeWorkSection  from '@/components/sections/HowWeWorkSection';
import WhyUsSection      from '@/components/sections/WhyUsSection';
import ReviewsSection    from '@/components/sections/ReviewsSection';
// import NewsSection       from '@/components/sections/NewsSection';
import FAQSection        from '@/components/sections/FAQSection';
import CTASection        from '@/components/sections/CTASection';
import NewsSectionTest from '../sections/NewsSectionTest';

export default function HomePage() {
  useEffect(() => {
    handlePendingScroll();
  }, []);

  return (
    <>
      <HeroSection />
      <SegmentSection />
      <OurPartners />
      <ServicesSection />
      <BeforeAfterSection />
      <WhatWeUseSection />
      <CalculatorSection />
      <HowWeWorkSection />
      <WhyUsSection />
      <ReviewsSection />
      <NewsSectionTest />
      {/* <NewsSection /> */}
      <FAQSection />
      <CTASection />
    </>
  );
}
