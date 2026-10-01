import ContactForm from '@/components/forms/contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Sky Market',
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
        <ContactForm />
      </div>
    </main>
  );
}
