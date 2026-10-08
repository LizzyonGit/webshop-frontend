'use client';

import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <button onClick={() => window.history.back()} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
