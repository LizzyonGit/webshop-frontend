import Link from 'next/link';

import { User } from 'lucide-react';
import SignUpForm from '@/components/forms/user/sign-up-form';

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="w-full max-w-md rounded-2xl border p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C09721]/40 bg-[#2A2414] shadow-[0_0_24px_rgba(192,151,33,0.08)]">
            <User className="h-6 w-6 text-white" strokeWidth={1.6} />
          </div>

          <h1 className="text-2xl font-semibold text-gray-600">Register user</h1>
        </div>

        <SignUpForm />
        <footer className="mt-5 grid grid-cols-1 gap-2 text-grey-700">
          <p className="text-center text-sm">
            <Link href="/account/register" className="font-medium transition-colors duration-200 hover:text-gray-600 hover:underline hover:underline-offset-4">
              Create account
            </Link>
          </p>
          <p className="text-center text-sm">
            <Link href="/account/forgot-password" className="font-medium transition-colors duration-200 hover:text-gray-600 hover:underline hover:underline-offset-4">
              Forgot your password?
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
