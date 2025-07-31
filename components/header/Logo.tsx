"use client";

import Link from 'next/link';
import { useSettingsStore } from '@/store/useSettingsStore';

export const Logo = () => {
  const { settings } = useSettingsStore();

  return (
    <Link href="/" className="flex items-center space-x-2">
      {settings.logo?.type === 'image' ? (
        <img src={settings.logo.src} alt="Logo" className="h-8 w-auto" />
      ) : (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background:
              settings.logo?.background?.type === 'gradient'
                ? `linear-gradient(to ${settings.logo.background.direction}, ${settings.logo.background.colors.join(', ')})`
                : settings.logo?.background?.color,
          }}
        >
          <span className="text-white font-bold text-lg">{settings.logo?.text}</span>
        </div>
      )}
      <span className="text-xl font-bold text-gray-900">{settings.siteName}</span>
    </Link>
  );
};
