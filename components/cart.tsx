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


export default async function Cart() {
    const {
    items,
    subtotal,
    hydrated,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();

    if (!hydrated) return null;//empty page when no items

    if (items.length === 0) {
        return(<CardTitle>No items</CardTitle>)}



return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-2xl font-semibold">1. Your Cart</CardTitle>
                    <CardDescription>Current items in your cart.</CardDescription>
                </div>
                    <CardAction>
                        <Button variant="link">
                            <Link href="/">Continue shopping</Link>
                        </Button>
                    </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4 py-4 border-b">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image 
                        src={`/thumbnails/apple.webp`}
                        alt=""
                        fill={true}
                        className="object-cover"
                        sizes="96px"
                        />
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <Link href="#" className="font-medium hover:underline">
                                (Title)
                            </Link>
                            <p className="text-muted-foreground text-sm">
                                €29.99
                            </p>
                        </div>
                        <div className="border-2 rounded-xl w-fit flex items-center">
                            <Button type="button" variant="ghost" size="sm">
                                -
                            </Button>
                            <span className="px-3 text-sm font-medium">1</span>
                            <Button type="button" variant="ghost" size="sm">
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">Order summary</h2>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Subtotal</p>
                        <span>€29.99</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Shipping cost</p>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between border-y-2 py-2 text-xl font-bold w-full">
                        <p>Total</p>
                        <span>€29.99</span>
                    </div>  
            </CardFooter>
        </Card>
    )
}
