"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of premium categories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Clothing',
              image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
              count: '150+ Products'
            },
            {
              name: 'Accessories',
              image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
              count: '80+ Products'
            },
            {
              name: 'Footwear',
              image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
              count: '120+ Products'
            }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.count}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
