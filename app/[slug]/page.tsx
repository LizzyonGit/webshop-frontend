import { ProductRepository } from '@/repositories/product-repository';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Input from '@/components/ui/input';
import type { Metadata } from 'next';
import AddToCartButton from '@/components/add-to-cart-button';

const productRepository = new ProductRepository();

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productRepository.getProduct(slug);

  return {
    title: product ? `${product.title} | Sky Market` : 'Product | Sky Market',
    description: product
      ? product.description.length > 155
        ? `${product.description.slice(0, 152)}...`
        : product.description
      : 'Discover products and shop online at Sky Market.',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await productRepository.getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Image src={`/images/${product.thumbnail}.webp`} width={500} height={500} alt={product.title} loading="eager" />

          <Image src={`/thumbnails/${product.slug}.webp`} width={50} height={50} alt={product.title} className="mt-4 rounded-md border" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-muted-foreground">{product.description}</p>

          <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>

          <p>
            <span className="font-medium">Category:</span> {product.category}
          </p>

          <p>
            <span className="font-medium">Brand:</span> {product.brand}
          </p>

          <p>
            <span className="font-medium">SKU:</span> {product.sku}
          </p>

          <p>
            <span className="font-medium">Stock:</span> {product.stock}
          </p>

          <div className="mt-6">
            <label htmlFor="quantity" className="mb-2 block font-medium">
              Quantity
            </label>

            <div className="w-24">
              <Input id="quantity" name="quantity" type="number" min={1} max={product.stock} defaultValue={1} />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
