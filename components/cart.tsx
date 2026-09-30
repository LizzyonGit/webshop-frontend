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

const cartItems = [
  {
    id: "1",
    slug: "classic-leather-backpack",
    title: "Classic Leather Backpack",
    price: 129,
    quantity: 4,
  },
  {
    id: "2",
    slug: "minimalist-water-bottle",
    title: "Minimalist Water Bottle",
    price: 28.5,
    quantity: 2,
  },
  {
    id: "3",
    slug: "wireless-noise-canceling-headphones",
    title: "Wireless Noise-Canceling Headphones",
    price: 199,
    quantity: 1,
  },
];

export default function Cart() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                    <CardAction>
                        <Button variant="link">
                            <Link href="/">&larr; Continue shopping</Link>
                        </Button>
                    </CardAction>
                    <CardTitle className="text-2xl font-semibold">1. Your Cart</CardTitle>
                    <CardDescription>Current items in your cart.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
                {cartItems.map((item) => 
                    <div 
                        key={item.id}
                        className="h-full w-full"
                        >
                    <div className="relative border-b border-border">
                        <Image 
                        src={`/thumbnails/${item.slug}.webp`}
                        alt={item.title}
                        fill={true}
                        className="object-cover"
                        sizes="96px"
                        />
                    </div>
                    <div>
                        <div>
                            <Link
                                href={`/products/${item.slug}`}
                                >
                                {item.title}
                            </Link>
                            <p className="text-muted-foreground">
                                €{item.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="border-3 w-fit">
                            <Button type="button" variant="ghost" size="sm">
                                -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button type="button" variant="ghost" size="sm">
                                +
                            </Button>
                        </div>
                    </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">Order summary</h2>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Subtotal</p>
                        <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Shipping cost</p>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between border-y-3 py-2 text-xl font-bold w-full">
                        <p>Total</p>
                        <span>€{subtotal.toFixed(2)}</span>
                    </div>  
            </CardFooter>
        </Card>
    )
}
