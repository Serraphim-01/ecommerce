'use client';

import { HeroSection } from './components/home/HeroSection';
import { FeaturesSection } from './components/home/FeaturesSection';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { CategoriesSection } from './components/home/CategoriesSection';
import { NewsletterSection } from './components/home/NewsletterSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CategoriesSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;