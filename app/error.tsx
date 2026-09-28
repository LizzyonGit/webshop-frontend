'use client';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.png')" }}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold">Something went wrong!</h1>

        <p className="mt-4 mb-4 text-gray-200 ">An unexpected error has occurred.</p>

        {/* ERROR MESSAGE */}
        {error.message && <p className="mt-4 mb-4 rounded-lg bg-red-600/40 px-4 py-3 text-sm text-white"> {error.message} </p>}

        <Button onClick={() => reset()} variant={'secondary'}>
          Försök igen
        </Button>
      </div>
    </main>
  );
}
