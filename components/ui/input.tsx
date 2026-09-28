import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`h-12 w-full rounded-xl border px-4 text-base leading-relaxed text-grey-700 outline-none placeholder:duration-300 hover:bg-grey-500 ${className} `}
    />
  );
}
