import Hero from '@/components/hero';

import ProductsTable from '@/components/products-table';
import ProductFiltering from '@/components/product-filters';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    stock?: string;
    search?: string;
    sortBy?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryParams = params.category ?? '';
  const sortByParams = params.sortBy ?? '';
  const searchParam = params.search ?? '';

  return (
    <>
        <Hero />
        <ProductFiltering categoryParam={categoryParams} sortByParam={sortByParams} searchParam={searchParam} />
        <ProductsTable searchParams={searchParams} />
    </>
  );
}
