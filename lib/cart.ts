import { CartItem } from '@/types/cart';

const CART_KEY = 'cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const cart = localStorage.getItem(CART_KEY);
  if (!cart) {
    return [];
  }

  try {
    return JSON.parse(cart);
  } catch (error) {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
