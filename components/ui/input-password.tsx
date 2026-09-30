'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import Input from '@/components/ui/input';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

export default function PasswordInput({ id, name, placeholder, autoComplete, disabled, 'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedby }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        className="pr-12"
      />

      <button
        type="button"
        onClick={() => setShowPassword((previous) => !previous)}
        disabled={disabled}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        aria-pressed={showPassword}
        className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-black transition-all duration-200 hover:bg-[#C09721]/10 hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  );
}
