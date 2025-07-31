'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/AuthModal';
import { useHeader } from './header/useHeader';
import { Logo } from './header/Logo';
import { SearchBar } from './header/SearchBar';
import { NavigationIcons } from './header/NavigationIcons';
import { MobileMenu } from './header/MobileMenu';
import { LoginPromptModal } from './header/LoginPromptModal';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
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
  } = useHeader();

  if (!mounted || loading) return null;

  const isAuthPage = pathname.startsWith('/auth') || pathname.startsWith('/admin/signin') || pathname.startsWith('/admin/signup');

  if (isAuthPage) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="flex items-center space-x-4">
              <NavigationIcons handleAuthRequired={handleAuthRequired} handleSignOut={handleSignOut} />
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isMobile />
        </div>
        <MobileMenu isMenuOpen={isMenuOpen} />
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
      />

      <LoginPromptModal
        showLoginPrompt={showLoginPrompt && !user}
        setShowLoginPrompt={setShowLoginPrompt}
        setAuthModalMode={setAuthModalMode}
        setShowAuthModal={setShowAuthModal}
      />
    </>
  );
};

export default Header;