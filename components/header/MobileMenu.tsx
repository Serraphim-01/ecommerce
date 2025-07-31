"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MobileMenuProps {
  isMenuOpen: boolean;
}

export const MobileMenu = ({ isMenuOpen }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-2 space-y-2">
            <Link href="/products" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="/categories" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
