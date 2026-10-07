'use client';

import { useCart } from '@/hooks/use-cart';
import CartIcon from './cart-icon';

type CartIconWrapperProps = {
  className?: string;
};

export default function CartIconWrapper({
  className = 'size-6',
}: CartIconWrapperProps) {
  const { itemCount } = useCart();

  return <CartIcon count={itemCount} className={className} />;
}
