import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';

export default function Hero() {
  return (
    <AspectRatio ratio={16 / 9} className="my-4 sm:aspect-21/9">
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <Image src="/hero.png" alt="Hero image" fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold tracking-wider sm:text-3xl md:text-4xl lg:text-5xl">Reach for the sky!</h1>
            <p className="mt-4 text-lg drop-shadow-md sm:text-xl">Discover products made for you</p>
          </div>
        </div>
      </div>
    </AspectRatio>
  );
}
