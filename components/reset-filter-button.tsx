'use client';

import { RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from './ui/button';

export default function ResetFilteringButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      router.replace('/');
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isPending}
      onClick={handleReset}
      className="h-12 w-full gap-2 rounded-xl border-zinc-200 px-4 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
    >
      <RotateCcw size={16} className={isPending ? 'animate-spin' : ''} aria-hidden="true" />

      <span>{isPending ? 'Resetting...' : 'Reset filters'}</span>
    </Button>
  );
}
