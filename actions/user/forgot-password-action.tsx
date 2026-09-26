'use server';

import { auth } from '@/lib/auth';
import { ActionResponse } from '@/types/action-response';
import { isAPIError } from 'better-auth/api';
import { headers } from 'next/headers';

export async function forgotPasswordAction(formData: FormData): Promise<ActionResponse> {
  const emailValue = formData.get('email');

  if (typeof emailValue !== 'string' || !emailValue.trim()) {
    return {
      success: false,
      message: 'Email is required',
      errors: {
        email: ['Please enter your email address.'],
      },
    };
  }

  const email = emailValue.trim();

  try {
    await auth.api.requestPasswordReset({
      headers: await headers(),
      body: {
        email,
        redirectTo: '/reset-password',
      },
    });

    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error) {
    console.error('Forgot password error:', error);

    if (isAPIError(error)) {
      console.error('Better Auth error:', {
        code: error.body?.code,
        message: error.message,
      });

      if (error.body?.code === 'VALIDATION_ERROR') {
        return {
          success: false,
          message: 'Invalid input',
          errors: {
            email: ['Invalid email'],
          },
        };
      }
    }

    return {
      success: false,
      message: 'Something went wrong',
      errors: {
        general: ['Unable to process your request. Please try again later.'],
      },
    };
  }
}
