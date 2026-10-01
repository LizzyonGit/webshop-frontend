import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type CartIconProps = {
  count?: number;
  className?: string;
};

export default function CartIcon({ count = 0, className = 'size-6' }: CartIconProps) {
  return (
    <span className="relative inline-flex">
      <ShoppingCart className={className} />
      <Badge className="absolute -right-2.5 -top-2.5 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] leading-none tabular-nums">{count > 99 ? '99+' : count}</Badge>
      <span className="sr-only">{count} items in cart</span>
    </span>
  );
}
