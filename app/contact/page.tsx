import type { Metadata } from 'next';
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { sendContactEmail } from './actions';

export const metadata: Metadata = {
  title: 'Contact | Sky Market',
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
        <form action={sendContactEmail} className="mt-8 space-y-6">
          <label htmlFor="email"> Email</label>
          <Input id="email"  name="email"  type="email" placeholder="Enter your email" required />

          <label htmlFor="message">Message</label>
          <Textarea id="message" name="message" placeholder="Enter your message" maxLength={500} required />

          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </main>
  );
}
