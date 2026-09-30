import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { resetPasswordEmail } from '@/lib/email-templates/reset-password-email';
import { sendEmail } from '@/lib/resend';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL ?? '';

      await sendEmail({
        to: user.email,
        subject: 'Reset your Sky Market password',
        html: resetPasswordEmail({
          userName: user.name || 'there',
          resetUrl: url,
          logoUrl,
        }),
      });
    },

    revokeSessionsOnPasswordReset: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ['USER', 'ADMIN'],
        required: false,
        defaultValue: 'USER',
        input: false,
      },
    },
  },

  plugins: [nextCookies()],
});
