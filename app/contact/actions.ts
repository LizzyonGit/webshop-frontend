'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const email = formData.get('email');
  const message = formData.get('message');

  const { error } = await resend.emails.send({
    from:  'Sky market <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL!,
    replyTo: email as string,
    subject: 'New contact message - Sky Market',
    text: `From: ${email}\n\nMessage:\n${message}`,
  });

 if (error) {
  throw new Error(`Could not send contact message: ${error.message}`);
}
}