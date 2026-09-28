import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"

export default function Hero() {
    return (
        <AspectRatio ratio={16/9} className="my-4">
            <Image 
                src="/hero.png" 
                alt="Hero image"
                fill
                className="container rounded-lg object-cover" 
            />
        </AspectRatio>
    )
}