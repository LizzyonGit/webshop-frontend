import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Shipping | Sky Market',
  description: 'Learn about shipping at Sky Market and how we deliver your orders safely and reliably.',
};
export default function ShippingPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight"> Shipping</h1>

        <p>We offer reliable shipping to make sure your order reaches you safely.</p>
      </div>
    </main>
  );
}
