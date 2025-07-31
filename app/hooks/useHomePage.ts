"use client";

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getFeaturedProducts } from '@/lib/supabase/products';

export const useHomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError('Failed to load featured products');
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return {
    featuredProducts,
    loading,
    error,
  };
};
