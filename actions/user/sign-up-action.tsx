'use server';

import { auth } from '@/lib/auth';
import { ActionResponse } from '@/types/action-response';
import { isAPIError } from 'better-auth/api';
import { headers } from 'next/headers';

export async function signUpEmailAction(formData: FormData): Promise<ActionResponse> {
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: 'Success',
    };
  } catch (error) {
    console.error('Sign in error:', error);

    if (isAPIError(error)) {
      if (error.body?.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
        return {
          success: false,
          message: 'Sign up failed',
          errors: {
            general: ['Email already exist!'],
          },
        };
      } else if (error.body?.code === 'PASSWORD_TOO_SHORT') {
        return {
          success: false,
          message: 'Sign up failed',
          errors: {
            general: ['Password too short!'],
          },
        };
      } else if (error.body?.code === 'VALIDATION_ERROR') {
        return {
          success: false,
          message: 'Sign up failed',
          errors: {
            general: ['Must enter password & email'],
          },
        };
      }

      return {
        success: false,
        message: 'Sign in failed',
        errors: {
          general: ['Unable to sign in. Please try again.'],
        },
      };
    }
    return {
      success: false,
      message: 'Sign up failed',
      errors: {
        general: ['Unable to sign in. Please try again.'],
      },
    };
  }
}
