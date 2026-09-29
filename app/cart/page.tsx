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
import Link from "next/link"

export default function Cart() {
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
