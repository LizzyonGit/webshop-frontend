'use client';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(n);

export default function Cart() {
  const { items, subtotal, hydrated, setQuantity, removeItem, clearCart } = useCart();

  if (!hydrated) return null; //Don't render my cart until we know what's actually in localStorage.

return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row gap-3 justify-between">
                <div className="flex flex-col gap-1">
                    
                    <CardTitle className="text-xl sm:text-2xl font-semibold">1. Your Cart</CardTitle>
                    <CardDescription>
                        {items.length === 0
                        ? "Your cart is empty."
                        : "Current items in your cart."}
                    </CardDescription>
                </div>
                <div className="flex flex-col gap-1">
                    <CardAction className="">
                            {/*since i removed the button, i added all button styles to the link below*/}
                            <Link href ="/" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-transparent bg-clip-padding px-0 text-sm font-medium whitespace-nowrap text-primary underline-offset-4 transition-all outline-none select-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 [&_svg:not([class*='size-'])]:size-4">
                            <ArrowLeft />
                            {items.length === 0
                        ? "Shop now"
                        : "Shop more"}</Link>{/*Shop more takes less space than Continue shopping*/}
                        
                    </CardAction>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
                
                <ul className="flex flex-col">
                    {items.map((item) => (
                    <li key={item.slug} className="flex items-center justify-between gap-1 py-4 border-b">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                        {item.image && (<Image 
                        src={item.image} 
                        alt={item.name}
                        fill={true}
                        className="object-cover"
                        sizes="96px"
                        />)}
                        </div>
                    <div className="flex flex-col sm:flex-1 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1 min-w-0 ">
                            <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                                {item.name}
                            </Link>
                            <p className="text-muted-foreground text-sm">
                                {formatPrice(item.price)}
                            </p>
                        </div>
                        <div className="flex gap-1">
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
                             <div>
                    {/* Tooltip explains that the trash icon removes the entire cart item */}
                  <Tooltip> 
                    <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.slug)} />}>
                      <Trash2 className="size-4" />
                    </TooltipTrigger>


             <TooltipContent className="bg-destructive/10 text-destructive">
                      <p>Remove item from cart</p>
                    </TooltipContent>
                  </Tooltip>
                </div></div>
                    </div>
                    </li>
                    ))}
                    {items.length > 0 && (<div className="flex justify-center mt-4">

                        {/*Clear cart with confirmation message*/}
                        <AlertDialog>
                            <AlertDialogTrigger render={
                                <Button 
                                variant="destructive"
                                />
                            }>Clear cart
                            </AlertDialogTrigger>
                            <AlertDialogContent size="sm">
                                <AlertDialogHeader>
                                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                                        <Trash2 />
                                    </AlertDialogMedia>
                                    <AlertDialogTitle>
                                        Remove {items.length} items from cart?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction 
                                        variant="destructive"
                                        onClick={clearCart}
                                    >
                                        Confirm
                                    </AlertDialogAction>
                                    <AlertDialogCancel 
                                        variant="ghost"
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

             
            </div>
          )}
        </ul>
      </CardContent>
      {items.length > 0 && (
        <CardFooter className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Order summary</h2>
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
      )}
    </Card>
  );
}
