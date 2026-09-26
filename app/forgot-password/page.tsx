import ForgotPasswordForm from '@/components/forms/user/forgot-password-form';
import { LockKeyholeIcon } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="w-full max-w-md rounded-2xl border p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C09721]/40 bg-[#2A2414] shadow-[0_0_24px_rgba(192,151,33,0.08)]">
            <LockKeyholeIcon className="h-6 w-6 text-white" strokeWidth={1.6} />
          </div>

          <h1 className="text-2xl font-semibold text-gray-600">Forgot password?</h1>
        </div>

        <ForgotPasswordForm />
        <footer className="mt-5 grid grid-cols-1 gap-2 text-[#b5b0a3]">
          <p className="text-center text-sm">
            <Link href="/login" className="font-medium transition-colors duration-200 hover:text-gray-600 hover:underline hover:underline-offset-4">
              Go back to login
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
