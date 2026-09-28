import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { resetPasswordEmail } from '@/lib/email-templates/reset-password-email';
import { sendEmail } from '@/lib/resend';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    // Send reset password email
    sendResetPassword: async ({ user, url }) => {
      //TDO: Add sky market loggo to env file.
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

    // Revoke sessions after password reset
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
});
