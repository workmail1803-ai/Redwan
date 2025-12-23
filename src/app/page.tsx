'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TrendingMorphSection from '@/components/TrendingMorphSection';
import MorphingTextSection from '@/components/MorphingTextSection';
import FeaturedCakes from '@/components/FeaturedCakes';
import Categories from '@/components/Categories';
import ParallaxGallery from '@/components/ParallaxGallery';
import Testimonials from '@/components/Testimonials';
import OrderCTA from '@/components/OrderCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gray-900 overflow-hidden">
      <Navbar />
      <Hero />
      <MorphingTextSection />
      <TrendingMorphSection />
      <About />
      <FeaturedCakes />
      <Categories />
      <ParallaxGallery />
      <Testimonials />
      <OrderCTA />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
