import { ProductRepository } from '@/repositories/product-repository';
import { notFound } from 'next/navigation';
import Image from 'next/image';
const productRepository = new ProductRepository();

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

        <p>
          <Image src={`/images/${product.thumbnail}.webp`} width={500} height={500} alt={`${product.title}`} loading="eager" />
        </p>

        <p>
          <Image src={`/thumbnails/${product.slug}.webp`} width={50} height={50} alt={`${product.title}`} />
        </p>
        </div>

                <div>
        
        <h1 className="text-3xl font-semibold">{product.title}</h1>

        <p className="text-muted-foreground">{product.description}</p>

        <p>Slug: {product.slug}</p>

        <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>

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
        </div>
      </div>
      

      



      
    </main>
  );
}
