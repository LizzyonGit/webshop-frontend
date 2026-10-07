'use client';

import { useCart } from "@/hooks/use-cart";
import Checkout from "./checkout";

export default function CheckoutWrapper() {
    const { items, hydrated } = useCart();

    if (!hydrated) return null;

    return <Checkout disabled={items.length === 0} />;
}
