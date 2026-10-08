import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"

export default function Hero() {
    return (
      <AspectRatio ratio={16/9} className="my-4 sm:aspect-21/9">
        <Image 
          src="/hero.png" 
          alt="Hero image"
          fill={true}
          sizes="(max-width: 1280px) 100vw, 1280px" 
          className="rounded-lg object-cover" 
          loading="eager" />
      </AspectRatio>
    );
}