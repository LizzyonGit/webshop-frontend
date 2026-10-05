"use client";

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type CardButtonProps = {
    productTitle: string;
}

export function AddToCartButton({ productTitle }: CardButtonProps) {
    const [isPending, setIsPending] = useState(false); 
    
    async function handleCartButton() {
    setIsPending(true);
        try {
          {/*Temporary timeout, replace with Add to Cart functionality when ready*/}
            await new Promise((resolve) => setTimeout(resolve, 500));

            toast.success(`Added ${productTitle} to cart!`);
        } catch (error) {
            console.error(`Add to Cart failed:`, error);
            toast.error(`Failed to add to cart! Please try again.`, { duration: 2000 });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Button
          type="button"
          variant="default"
          onClick={handleCartButton}
          disabled={isPending}
        >
          <ShoppingCart />
          {isPending ? "Adding..." : "Add to cart"}
        </Button>
    )
}
