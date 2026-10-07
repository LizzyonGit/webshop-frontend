'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
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
      <label htmlFor="quantity" className="mb-2 block font-medium">Quantity</label>

      <div className="w-24">
        <Input
          id="quantity"
          type="number"
          min={1}
          max={max}
          value={quantity}
          disabled={outOfStock}
          className="w-24"
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            setQuantity(Number.isNaN(n) ? 1 : Math.min(Math.max(n, 1), max));
          }}
        />

        <Button type="button" onClick={handleAdd} disabled={outOfStock} className="mt-4">
          {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {outOfStock ? 'Out of stock' : added ? 'Added' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}
