'use client';

import { SubmitEvent } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { Textarea } from '../ui/textarea';
import { sendContactEmailAction } from '@/actions/contact-action';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const router = useRouter();

  async function sendContactEmail(evt: SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      const formData = new FormData(evt.currentTarget);
      const result = await sendContactEmailAction(formData);

      if (!result.success) {
        toast.error(result.message, { duration: 1000 });
        return;
      }

      router.replace('/');
      router.refresh();
      return toast.success(result.message);
    } catch (error) {
      console.error('Send email failed:', error);

      toast.error('Something went wrong. Please try again.', {
        duration: 2000,
      });
    }
  }

  return (
    <form onSubmit={sendContactEmail} className="mt-8 space-y-6">
      <label htmlFor="email"> Email</label>
      <Input id="email" name="email" type="email" placeholder="Enter your email" required />

      <label htmlFor="message">Message</label>
      <Textarea id="message" name="message" placeholder="Enter your message" maxLength={500} required />

      <Button type="submit">Send Message</Button>
    </form>
  );
}
