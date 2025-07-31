"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const useHeader = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show login prompt after 1 minute for non-authenticated users
  useEffect(() => {
    if (!loading && !user && mounted) {
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 60000); // 1 minute

      return () => clearTimeout(timer);
    }
  }, [user, loading, mounted]);

  const handleAuthRequired = useCallback((action: string) => {
    if (!user) {
      setAuthModalMode('login');
      setShowAuthModal(true);
      return false;
    }
    return true;
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return {
    user,
    loading,
    isMenuOpen,
    searchQuery,
    showAuthModal,
    authModalMode,
    showLoginPrompt,
    mounted,
    setSearchQuery,
    setShowAuthModal,
    setAuthModalMode,
    setShowLoginPrompt,
    handleAuthRequired,
    handleSignOut,
    toggleMenu,
    signOut,
  };
};
