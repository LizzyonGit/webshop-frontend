'use server';

import { auth } from '@/lib/auth';
import { ActionResponse } from '@/types/action-response';
import { isAPIError } from 'better-auth/api';
import { headers } from 'next/headers';

export async function resetPasswordAction(formData: FormData, token: string): Promise<ActionResponse> {
  const newPassword = String(formData.get('password'));

  try {
    await auth.api.resetPassword({
      headers: await headers(),
      body: {
        newPassword,
        token,
      },
    });

    return {
      success: true,
      message: 'Reset password successfully',
    };
  } catch (error) {
    console.error('Reset password error:', error);

    if (isAPIError(error)) {
      if (error.body?.code === 'PASSWORD_TOO_SHORT') {
        return {
          success: false,
          message: 'Something went wrong!',
          errors: {
            password: ['Password too short'],
          },
        };
      }
    }
    return {
      success: false,
      message: 'Something went wrong',
      errors: {
        general: ['An unexpected error occurred.'],
      },
    };
  }
}
