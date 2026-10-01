'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart, type CartProduct } from '@/hooks/use-cart';

export default function AddToCart({ product }: { product: CartProduct }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const max = product.stock ?? 99;
  const outOfStock = max <= 0;

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="quantity">Quantity</Label>

      <div className="flex items-center gap-3">
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

        <Button type="button" onClick={handleAdd} disabled={outOfStock}>
          {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {outOfStock ? 'Out of stock' : added ? 'Added' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}
