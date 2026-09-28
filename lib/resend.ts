import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: 'Sky market <onboarding@resend.dev>',
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Email sending failed:', error);
    throw new Error('Could not send email');
  }

  return data;
}
