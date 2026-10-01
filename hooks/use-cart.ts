'use client';

import { useMemo, useSyncExternalStore } from 'react';

export type CartProduct = {
  slug: string;
  name: string;
  price: number;
  image?: string;
  stock?: number;
};

export type CartItem = CartProduct & { quantity: number };

const STORAGE_KEY = 'sky-market-cart';
const EMPTY: CartItem[] = [];

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((i): i is CartItem => typeof i?.slug === 'string' && typeof i?.price === 'number' && typeof i?.quantity === 'number' && i.quantity > 0);
  } catch {
    return [];
  }
}

function getSnapshot(): CartItem[] {
  if (cache === null) cache = readStorage();
  return cache;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keeps other tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      cache = null;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function commit(items: CartItem[]) {
  cache = items;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or blocked: the cart still works for this session
  }
  listeners.forEach((l) => l());
}

const clamp = (quantity: number, stock?: number) => Math.max(1, Math.min(quantity, stock ?? Infinity));

function addItem(product: CartProduct, quantity = 1) {
  const items = getSnapshot();
  const existing = items.find((i) => i.slug === product.slug);

  if (existing) {
    commit(items.map((i) => (i.slug === product.slug ? { ...i, ...product, quantity: clamp(i.quantity + quantity, product.stock) } : i)));
  } else {
    commit([...items, { ...product, quantity: clamp(quantity, product.stock) }]);
  }
}

function removeItem(slug: string) {
  commit(getSnapshot().filter((i) => i.slug !== slug));
}

function setQuantity(slug: string, quantity: number) {
  if (quantity < 1) return removeItem(slug);
  commit(getSnapshot().map((i) => (i.slug === slug ? { ...i, quantity: clamp(quantity, i.stock) } : i)));
}

function clearCart() {
  commit([]);
}

const subscribeNoop = () => () => {};

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // false on the server and during hydration, true afterwards
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    [items],
  );

  return { items, itemCount, subtotal, hydrated, addItem, removeItem, setQuantity, clearCart };
}
