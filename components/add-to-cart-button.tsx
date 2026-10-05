'use client';

import { useCart } from '@/components/providers/cart-provider';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

type Props = {
  productId: string;
};

export default function AddToCartButton({ productId }: Props) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(productId, 1);
  }
  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart />
      Add to cart
    </Button>
  );
}
