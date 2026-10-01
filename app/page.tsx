import NavigationBar from '@/components/navigation-bar';
import Footer from '@/components/footer';
import Hero from '@/components/hero';

import ProductsTable from '@/components/products-table';
import ProductFiltering from '@/components/product-filters';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    stock?: string;
    search?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryParams = params.category ?? '';

  return (
    <main className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <NavigationBar />
        <Hero />
        <ProductFiltering categoryParam={categoryParams} />
        <ProductsTable searchParams={searchParams} />
      </div>
      <Footer />
    </main>
  );
}
