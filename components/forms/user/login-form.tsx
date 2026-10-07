'use client';

import { SubmitEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, LockKeyhole } from 'lucide-react';
import { signInEmailAction } from '@/actions/user/sign-in-email-action';
import FormField from '@/components/ui/form-field';
import PasswordInput from '@/components/ui/input-password';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    general?: string;
  }>({});

  const [isPending, setPending] = useState(false);

  async function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    setPending(true);
    setErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      const result = await signInEmailAction(formData);

      console.log(result);
      if (!result.success) {
        toast.error(result.message, { duration: 1000 });

        setErrors(result.errors ?? {});
        return;
      }

      toast.success(result.message, { duration: 1000 });

      if (!result.userRole || result.userRole === 'USER') {
        router.push('/');
      } else if (result.userRole === 'ADMIN') {
        router.push('/admin');
      }
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
      <FormField label="Password" htmlFor="password" error={errors.password?.[0]} icon={<LockKeyhole className="h-5 w-5" />}>
        <PasswordInput
          id="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={isPending}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
      </FormField>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        {/* Submit */}
        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>

        {/* Cancel */}
        <Button variant="destructive">
          <Link href="/">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
