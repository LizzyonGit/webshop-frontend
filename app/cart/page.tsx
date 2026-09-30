import { Button } from "@/components/ui/button";
import Cart from "@/components/cart";
import Checkout from "@/components/checkout";
import Image from "next/image";
import Link from "next/link"

export default function CartPage() {
    return (
        <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
            <Cart />
            <Checkout />
        </main>
    )
}
