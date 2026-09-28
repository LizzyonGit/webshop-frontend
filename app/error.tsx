'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.png')" }}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold">Något gick fel!</h1>

        <p className="mt-4 mb-4 text-gray-200 ">Ett oväntat fel har inträffat.</p>
        <Button onClick={() => reset()} variant={'secondary'}>
          Försök igen
        </Button>
      </div>
    </main>
  );
}
