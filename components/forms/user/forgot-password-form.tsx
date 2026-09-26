'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import Input from '@/components/ui/input';

import FormField from '@/components/ui/form-field';
import { forgotPasswordAction } from '@/actions/user/forgot-password-action';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    general?: string;
  }>({});

  const [email, setEmail] = useState('');
  const [isPending, setPending] = useState(false);

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setPending(true);
    setErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      const result = await forgotPasswordAction(formData);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errors.general}
        </p>
      )}
      {/* Email*/}
      <FormField label="Email address" htmlFor="email" error={errors.email?.[0]}>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Enter your email"
          autoComplete="email"
          disabled={isPending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <Button disabled={isPending}>{isPending ? 'Sending...' : 'Send Reset Link'}</Button>
    </form>
  );
}
