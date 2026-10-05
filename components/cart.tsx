'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link"
import { useCart } from "@/hooks/use-cart";
import { productImageFileSchema } from "@/lib/validation/product-image";
import { ArrowLeft } from "lucide-react";

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(n);

export default function Cart() {
    const {
    items,
    subtotal,
    hydrated,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();

    if (!hydrated) return null;//empty page when no items

    



return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-2xl font-semibold">1. Your Cart</CardTitle>
                    <CardDescription>
                        {items.length === 0
                        ? "Your cart is currently empty."
                        : "Current items in your cart."}
                    </CardDescription>
                </div>
                    <CardAction>
                        <Button variant="link">
                            <Link href ="/" className="flex items-center gap-2">
                            <ArrowLeft />
                            {items.length === 0
                        ? "Start shopping"
                        : "Continue shopping"}</Link>
                        </Button>
                    </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
                {items.length === 0 ? (
                    <div className="flex flex-col">
                        <h2>Your cart is empty</h2>
                    </div>
                ) : (
                <ul className="flex flex-col">
                    {items.map((item) => (
                    <li key={item.slug} className="flex items-center gap-4 py-4 border-b">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                        {item.image && (<Image 
                        src={item.image} 
                        alt={item.name}
                        fill={true}
                        className="object-cover"
                        sizes="96px"
                        />)}
                        </div>
                    <div className="flex flex-1 items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                                {item.name}
                            </Link>
                            <p className="text-muted-foreground text-sm">
                                {formatPrice(item.price)}
                            </p>
                        </div>
                        <div className="border-2 rounded-xl w-fit flex items-center">
                            <Button type="button" variant="ghost" size="sm" aria-label="Decrease quantity" onClick={() => setQuantity(item.slug, item.quantity - 1)}>
                                -
                            </Button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <Button type="button" variant="ghost" size="sm" aria-label="Increase quantity"
                            disabled={item.stock !== undefined && item.quantity >= item.stock}
                            onClick={() => setQuantity(item.slug, item.quantity + 1)}>
                                +
                            </Button>
                        </div>
                    </div>
                    </li>
                    ))}
                </ul>
            )}
                
                
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">Order summary</h2>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Subtotal</p>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Shipping cost</p>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between border-y-2 py-2 text-xl font-bold w-full">
                        <p>Total</p>
                        <span>{formatPrice(subtotal)}</span>
                    </div>  
            </CardFooter>
        </Card>
    )
}
