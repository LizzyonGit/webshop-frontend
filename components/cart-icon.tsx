'use client';

import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/cart-provider';

type CartIconProps = {
  className?: string;
};

export default function CartIcon({ className = 'size-6' }: CartIconProps) {
  const { cartCount } = useCart();

  return (
    <span className="relative inline-flex">
      <ShoppingCart className={className} />

      <Badge className="absolute -right-2.5 -top-2.5 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] leading-none tabular-nums">
        {cartCount > 99 ? '99+' : cartCount}
      </Badge>

      <span className="sr-only">{cartCount} items in cart</span>
    </span>
  );
}
