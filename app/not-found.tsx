'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.png')" }}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold">404</h1>

        <p className="mt-5 mb-5 text-gray-200 ">Page {pathname} not found.</p>
        <Link href="/" className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black shadow-lg  transition-all duration-200 hover:scale-105">
          Home
        </Link>
      </div>
    </main>
  );
}
