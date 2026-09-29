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

export default function Checkout() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2">
                        <CardTitle className="text-2xl font-semibold">2. Checkout</CardTitle>
                        <CardDescription>Please fill in your order details.</CardDescription>
                    </div>
                </CardHeader>    
                    <form>
                        
                    </form>
                <CardContent className="grid grid-cols-1 gap-6">

                </CardContent>
                <CardFooter>
                    <Button 
                        variant="link"
                        className="mx-auto"
                    >
                        <Link href="/shipping">Proceed to checkout</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>  
    )
}
