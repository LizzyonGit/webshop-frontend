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
    quantity: 1,
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
        <main className="mx-auto max-w-7xl px-6 py-10">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Your Cart</CardTitle>

                    <CardDescription>Current items in your cart.</CardDescription>
                    <CardAction>
                        <Button variant="link"><Link href="/">Continue shopping</Link></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </main>  
    )
}
