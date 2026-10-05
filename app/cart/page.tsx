import Cart from '@/components/cart';
import Checkout from '@/components/checkout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Sky Market',
  description: 'Review the products in your Sky Market shopping cart before checkout.',
};

export default function CartPage() {
  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
      <Cart />
      <Checkout />
    </main>
  );
}
