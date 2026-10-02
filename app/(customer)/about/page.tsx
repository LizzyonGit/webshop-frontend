import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Sky Market | Online Shopping',
  description: 'Learn more about Sky Market and how we make online shopping simple and convenient for our customers.',
};
export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">About us</h1>

        <p>Welcome to Sky Market. We offer a simple and convenient way to shop online.</p>
      </div>
    </main>
  );
}
