'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types/cart';
import { getCart, saveCart } from '@/lib/cart';

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  function addToCart(productId: string, quantity: number) {
    const updatedCart = [...cart];

    const existingItem = updatedCart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      updatedCart.push({
        productId,
        quantity,
      });
    }

    setCart(updatedCart);
    saveCart(updatedCart);
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
