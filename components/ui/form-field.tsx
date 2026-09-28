import type { ReactNode } from 'react';

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  icon?: ReactNode;
};

export default function FormField({ label, htmlFor, error, children, icon }: Props) {
  return (
    <div className="space-y-3">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-base leading-5 font-semibold text-gray-600">
        {icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center text-grey-700">{icon}</span>}
        <span className="leading-5">{label}</span>
      </label>

      {children}

      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
