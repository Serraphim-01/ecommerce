"use client";

import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Package } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from './UserMenu';

interface NavigationIconsProps {
  handleAuthRequired: (action: string) => boolean;
  handleSignOut: () => void;
}

export const NavigationIcons = ({ handleAuthRequired, handleSignOut }: NavigationIconsProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { wishlist, getCartCount } = useStore();
  const cartCount = user ? getCartCount(user.id) : 0;
  const userWishlist = user ? wishlist[user.id] || [] : [];

  return (
    <div className="flex items-center space-x-4">
      {!user?.user_metadata.is_admin && (
        <>
          <button
            onClick={() => router.push('/products')}
            className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Package className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              if (handleAuthRequired('wishlist')) {
                router.push('/wishlist');
              }
            }}
            className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <Heart className="w-6 h-6" />
            {userWishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {userWishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              if (handleAuthRequired('cart')) {
                router.push('/cart');
              }
            }}
            className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </>
      )}
      <UserMenu handleSignOut={handleSignOut} />
    </div>
  );
};
