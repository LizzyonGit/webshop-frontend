'use client';

import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CircleAlert className="h-10 w-10 text-red-300" />
          </div>
        </div>

        <h1 className="text-4xl font-bold">Something went wrong!</h1>
        <p className="mt-4 mb-4 text-gray-200 ">An unexpected error has occurred.</p>

        {error.message && (
          <div className="mt-6 mb-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-left">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-300">
              <CircleAlert className="h-4 w-4 shrink-0" />
              Error details
            </div>

            <p className=" text-sm leading-relaxed text-gray-300">{error.message}</p>
          </div>
        )}

        <Button onClick={() => reset()} variant={'secondary'}>
          Try again
        </Button>
      </div>
    </main>
  );
}
