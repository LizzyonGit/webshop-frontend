import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductPage({
                                              params,
                                          }: ProductPageProps) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: {
            slug,
        },
    });

    if (!product) {
        notFound();
    }

    return (
        <main>
            <h1>title: {product.title}</h1>

            <p>description: {product.description}</p>

            <p>slug: {product.slug}</p>

            <p>Price: {product.price.toString()}</p>

            <p>Category: {product.category}</p>

            <p>Brand: {product.brand}</p>

            <p>SKU: {product.sku}</p>

            <p>Stock: {product.stock}</p>

            <p>
                Image:
                <Image
                    src={`/images/${product.slug}.webp`}
                    width={500}
                    height={500}
                    alt={`${product.title}`}
                    loading="eager"
                />
            </p>
            <p>
                <Image
                    src={`/thumbnails/${product.slug}.webp`}
                    width={50}
                    height={50}
                    alt={`${product.title}`}
                />
            </p>
        </main>
    );
}