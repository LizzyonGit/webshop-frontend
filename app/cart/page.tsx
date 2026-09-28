import { Button } from "@/components/ui/button";
import { 
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
 } from "@/components/ui/card";
import Link from "next/link";

export default function Cart() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>
                Your Cart
                </CardTitle>
                <CardDescription>
                Current items in your cart.
                </CardDescription>
                <CardAction>
                    <Button variant="link"><Link href="./products">Continue shopping</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
                <div> {/* Left column: cart*/}
                    <form action="">

                    </form>
                </div>

                <div> {/* Right column: checkout*/}
                    <form action="">

                    </form>
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
         </Card>
    )
}