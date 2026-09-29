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
    <Card>
        <CardHeader>
            <CardTitle>Your Cart</CardTitle>
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
}