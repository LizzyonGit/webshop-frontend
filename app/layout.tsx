import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Nunito_Sans, Noto_Sans } from 'next/font/google';
import './globals.css';

import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import NavigationBar from '@/components/navigation-bar';
import Footer from '@/components/footer';
import { TooltipProvider } from '@/components/ui/tooltip';

const notoSansHeading = Noto_Sans({ subsets: ['latin'], variable: '--font-heading' });

const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans' });

import CookieBanner from '@/components/cookie-banner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Online Shopping | Sky Market',
  description: 'Buy high quality products from trusted seller with fast delivery and easy return with Sky Market',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'dark',
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        'font-sans',
        nunitoSans.variable,
        notoSansHeading.variable,
        'scrollbar-gutter-stable',
      )}
    >
      <body className="flex min-h-dvh flex-col">
        <TooltipProvider>
          <NavigationBar />
          <main className="flex-1">
            <div className="container max-w-7xl mx-auto px-6">{children}</div>
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
          <CookieBanner />
        </TooltipProvider>
      </body>
    </html>
  );
}
