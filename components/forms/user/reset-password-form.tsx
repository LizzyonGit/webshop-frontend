'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/ui/input';
import FormField from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { resetPasswordAction } from '@/actions/user/reset-password-action';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    general?: string;
  }>({});

  const [isPending, setPending] = useState(false);

  const isValidToken = !!token;

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setPending(true);
    setErrors({});

    if (!token) {
      toast.error('Coldt not find any token');
      return;
    }

    try {
      const formData = new FormData(evt.currentTarget);
      const result = await resetPasswordAction(formData, token);

      if (!result.success) {
        toast.error(result.message, { duration: 1000 });

        setErrors(result.errors ?? {});
        return;
      }

      router.replace('/');
      router.refresh();
      return toast.success(result.message);
    } catch (error) {
      console.error('Register user form error:', error);

      toast.error('Something went wrong. Please try again.', {
        duration: 2000,
      });
    } finally {
      setPending(false);
    }
  }

  if (!isValidToken) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[#C09721] bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">Invalid Reset Link</h1>

        <p className="mt-3 text-sm text-gray-500">This reset link is invalid or has expired.</p>

        <Link href="/account/forgot-password" className="mt-6 inline-block text-sm font-medium text-[#C09721] hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {errors.general && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errors.general}
        </p>
      )}
      {/* Email */}
      <FormField label="New Password" htmlFor="password" error={errors.password?.[0]}>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Enter new password"
          autoComplete="new-password"
          disabled={isPending}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
      </FormField>

      {/* Confirm Password */}
      <FormField label="Confirm Password" htmlFor="confirmPassword">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          placeholder="Confirm new password"
          autoComplete="new-password"
          disabled={isPending}
        />
      </FormField>

      {/* Submit */}
      <Button disabled={isPending}>{isPending ? 'Logging in...' : 'Login'}</Button>
    </form>
  );
}
