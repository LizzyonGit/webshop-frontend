import { Search } from 'lucide-react';
import { Button } from './ui/button';
import Input from './ui/input';
import ResetFilteringButton from './reset-filter-button';
import { CategoryRepository } from '@/repositories/category-repository';

type Props = {
  categoryParam: string;
  sortByParam: string;
};

export default async function ProductFiltering({ categoryParam, sortByParam }: Props) {
  const categoryRepository = new CategoryRepository();
  const categories = await categoryRepository.getAll();

  return (
    <section className="mb-6" aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">
        Search and filter products
      </h2>

      <form action="/" method="GET" className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <label htmlFor="search" className="sr-only">
          Search products
        </label>

        {/* Search on products*/}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <Input type="search" name="search" id="search" placeholder="Search products..." className="h-10 rounded-xl  border-zinc-200 pl-10 shadow-none focus-visible:ring-1" />
        </div>

        {/* Filter on categories */}
        <div className="relative">
          <label htmlFor="category" className="sr-only">
            Filter by category
          </label>
          <select
            key={categoryParam}
            name="category"
            id="category"
            defaultValue={categoryParam}
            className="h-12 rounded-xl border px-4 text-base leading-relaxed text-grey-700 outline-none"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort products */}
        <div className="relative">
          <label htmlFor="sortBy" className="sr-only">
            Sort by
          </label>
          <select
            key={sortByParam}
            name="sortBy"
            id="sortBy"
            defaultValue={sortByParam}
            className="h-12 rounded-xl border px-4 text-base leading-relaxed text-grey-700 outline-none"
          >
            <option value="">Sort by</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            <option value="lowest">Lowest first</option>
            <option value="highest">Highest first</option>
          </select>
        </div>

        <Button type="submit" className=" h-10 gap-2 rounded-xl px-5">
          <Search size={17} aria-hidden="true" />
          Search
        </Button>

        <ResetFilteringButton />
      </form>
    </section>
  );
}
