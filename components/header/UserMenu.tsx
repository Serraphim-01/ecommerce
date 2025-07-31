"use client";

import { User as UserIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  handleSignOut: () => void;
}

export const UserMenu = ({ handleSignOut }: UserMenuProps) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push('/auth/login')}
        className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
      >
        <UserIcon className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {user.user_metadata.is_admin && (
        <Link href="/admin/settings" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
          <Settings className="w-6 h-6" />
        </Link>
      )}
      <div className="relative group">
        <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
          <UserIcon className="w-6 h-6" />
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {user.user_metadata.is_admin ? (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Admin Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </Link>
            </>
          )}
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
