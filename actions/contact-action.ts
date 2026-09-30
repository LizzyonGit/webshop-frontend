'use server';

import { ActionResponse } from '@/types/action-response';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmailAction(formData: FormData): Promise<ActionResponse> {
  const email = formData.get('email');
  const message = formData.get('message');

  const { error } = await resend.emails.send({
    from: 'Sky market <onboarding@resend.dev>',
    to: 'soderbergdavid97@gmail.com',
    replyTo: email as string,
    subject: 'New contact message - Sky Market',
    text: `From: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    return {
      success: false,
      message: `Could not send contact message: ${error.message}`,
    };
  }

  return {
    success: true,
    message: 'The email was sent successfully.',
  };
}
