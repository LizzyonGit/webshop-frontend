import Cart from "@/components/cart";
import Checkout from "@/components/checkout";
import Image from "next/image";
import Link from "next/link"

export default function CartPage() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-row">
                <Cart />
                <Checkout />
            </div>
        </main>
    )
}
