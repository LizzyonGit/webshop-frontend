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
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Cart() {
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
                    <div 
                        className="h-full w-full"
                        >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image 
                        src={`/thumbnails/.webp`}
                        alt=""
                        fill={true}
                        className="object-cover"
                        sizes="96px"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 min-w-0">
                            <Link
                                href={`/products/`}
                                >
                                Title
                            </Link>
                            <p className="text-muted-foreground">
                            </p>
                        </div>
                        <div className="border-3 rounded-xl w-fit">
                            <Button type="button" variant="ghost" size="sm">
                                -
                            </Button>
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
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="font-bold">Shipping cost</p>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between border-y-3 py-2 text-xl font-bold w-full">
                        <p>Total</p>
                    </div>  
            </CardFooter>
        </Card>
    )
}
