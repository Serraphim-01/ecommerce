import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ConditionalWhatsAppButton from '@/components/ConditionalWhatsAppButton';
import { Toaster } from '@/components/ui/toaster';
import SettingsProvider from '@/components/SettingsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ElegantShop - Premium Fashion & Lifestyle',
  description: 'Discover premium fashion and lifestyle products with seamless shopping experience',
  keywords: 'fashion, lifestyle, premium, shopping, ecommerce, Nigeria',
  authors: [{ name: 'ElegantShop' }],
  openGraph: {
    title: 'ElegantShop - Premium Fashion & Lifestyle',
    description: 'Discover premium fashion and lifestyle products with seamless shopping experience',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <ConditionalWhatsAppButton />
          <Toaster />
        </SettingsProvider>
      </body>
    </html>
  );
}