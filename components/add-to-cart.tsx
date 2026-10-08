'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, type CartProduct } from '@/hooks/use-cart';
import { toast } from 'sonner';

export default function AddToCart({ product }: { product: CartProduct }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const max = product.stock ?? 99;
  const outOfStock = max <= 0;

  function handleAdd() {
    try{
        //for testing failed to add
        //  const testError = true;
        // if (testError) {
        // throw new Error('Test error');
        // } 

    addItem(product, quantity);
    toast.success(`Added ${product.name} to cart!`);
    setQuantity(1); //resets qty input value
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  } catch (error) {
    console.error('Add to Cart failed:', error);
    toast.error('Failed to add to cart! Please try again.', {
      duration: 2000,
    });
}}

  return (
    <div className="flex flex-col gap-2">
      <span className="mb-2 block font-medium">Quantity</span>

      <div className="w-24">
        <div className="flex items-center rounded-xl border-2">
          <Button
            type="button"
            variant="ghost"
            aria-label="Decrease quantity"
            disabled={outOfStock || quantity <= 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </Button>
          <span className="px-3 text-sm font-medium">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            aria-label="Increase quantity"
            disabled={outOfStock || quantity >= max}
            onClick={() => setQuantity((current) => Math.min(max, current + 1))}
          >
            +
          </Button>
        </div>

        <Button type="button" onClick={handleAdd} disabled={outOfStock} className="mt-4">
          {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {outOfStock ? 'Out of stock' : added ? 'Added' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}
