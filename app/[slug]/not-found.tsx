'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SearchX } from 'lucide-react';

export default function ProductNotFound() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  return (
    <main
      className="relative left-1/2 w-screen -translate-x-1/2 flex min-h-screen items-center justify-center overflow-hidden bg-[url('/hero.png')]
    bg-size-[120%_auto]
    bg-center
    bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <SearchX className="h-10 w-10  text-white" />
          </div>
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white">404 – product not found</p>
        <p className="mb-6 text-base leading-relaxed text-white">{`The product "${slug}" you are looking for is no longer available, has been removed, or the link is incorrect.`}</p>

        <Link href="/" className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black shadow-lg  transition-all duration-200 hover:scale-105">
          Go back to product list
        </Link>
      </div>
    </main>
  );
}
