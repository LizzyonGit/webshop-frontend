//Components
import ProductListComponent from '@/components/admin/product-list';
import Header from '@/components/admin/header';
import InventoryStatistics from '@/components/admin/inventory-statistics';
import SearchForm from '@/components/admin/search-form';
import { ProductRepository } from '@/repositories/product-repository';
import { CategoryRepository } from '@/repositories/category-repository';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    stock?: string;
    search?: string;
    sortBy?: string;
  }>;
};

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  //Set default current page to 1 if params.page is undefined.
  const currentPage = Number(params.page ?? '1');

  //Filter on category with params
  const categoryParams = params.category ?? '';

  const searchParam = params.search ?? '';

  //Filter on stock with params
  const stockParams = params.stock ?? '';

  const sortByParam = params.sortBy ?? '';

  const categories = await categoryRepository.getAll();
  const productResponse = await productRepository.getProducts(currentPage, categoryParams, stockParams, searchParam, sortByParam);

  const pages = productResponse.totalPages ?? 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header categories={categories} />

      <div className="container max-w-7xl mx-auto px-6 py-6">
        <InventoryStatistics />

        <SearchForm categories={categories} selectedCategory={categoryParams} selectedStock={stockParams} />

        <ProductListComponent
          products={productResponse.products}
          categories={categories}
          categoryParam={categoryParams}
          stockParam={stockParams}
          queryParam={searchParam}
          currentPage={currentPage}
          totalPages={pages}
        />
      </div>
    </main>
  );
}
