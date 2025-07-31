"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
          alt="Fashion Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Elevate Your Style
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Discover premium fashion and lifestyle products curated just for you
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
