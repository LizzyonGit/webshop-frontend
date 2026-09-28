import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"

export default function Hero() {
    return (
        <AspectRatio ratio={1} className="my-4 sm:aspect-video">
            <Image 
                src="/hero.png" 
                alt="Hero image"
                fill
                className="rounded-lg object-cover" 
            />
        </AspectRatio>
    )
}