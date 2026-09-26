'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { Mail, LockKeyhole } from 'lucide-react';
import { signInEmailAction } from '@/actions/user/sign-in-email-action';
import FormField from '@/components/ui/form-field';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    general?: string;
  }>({});

  const [isPending, setPending] = useState(false);

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setPending(true);
    setErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      const result = await signInEmailAction(formData);

      if (!result.success) {
        toast.error(result.message, { duration: 1000 });

        setErrors(result.errors ?? {});
        return;
      }

      router.push('/');
      return toast.success(result.message);
    } catch (error) {
      console.error('Login form error:', error);

      toast.error('Something went wrong. Please try again.', {
        duration: 2000,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {errors.general && (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errors.general}
        </p>
      )}
      {/* Email */}
      <FormField label="Email address" htmlFor="email" error={errors.email?.[0]} icon={<Mail className="h-4 w-4" />}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@live.se"
          autoComplete="email"
          disabled={isPending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </FormField>

      {/* Password */}
      <FormField label="Password" htmlFor="password" error={errors.password?.[0]} icon={<LockKeyhole className="h-4 w-4" />}>
        <Input
          id="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={isPending}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
      </FormField>

      {/* Submit */}
      <Button type="submit" variant="default" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
