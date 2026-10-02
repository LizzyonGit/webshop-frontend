import { Search } from 'lucide-react';
import { Button } from './ui/button';
import Input from './ui/input';
import ResetFilteringButton from './reset-filter-button';
import { CategoryRepository } from '@/repositories/category-repository';

type Props = {
  categoryParam: string;
  sortByParam: string;
  searchParam: string;
};

export default async function ProductFiltering({ categoryParam, sortByParam, searchParam }: Props) {
  const categoryRepository = new CategoryRepository();
  const categories = await categoryRepository.getAll();

  return (
    <section className="mb-6" aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">
        Search and filter products
      </h2>

      <form
        action="/"
        method="GET"
        className="
          grid grid-cols-2 gap-3
          rounded-2xl border border-zinc-200
          bg-white p-4 shadow-sm
          sm:grid-cols-4
          lg:flex lg:items-center
        "
      >
        {/* Search */}
        <div
          className="
            relative col-span-2 min-w-0
            sm:col-span-4
            lg:col-span-1 lg:flex-1
          "
        >
          <label htmlFor="search" className="sr-only">
            Search products
          </label>

          <Search
            size={18}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-zinc-400
            "
            aria-hidden="true"
          />

          <Input
            defaultValue={searchParam}
            type="search"
            name="search"
            id="search"
            placeholder="Search products..."
            className="
              h-10 w-full rounded-xl
              border-zinc-200 pl-10
              shadow-none
              focus-visible:ring-1
            "
          />
        </div>

        {/* Category */}
        <div
          className="
            min-w-0
            lg:w-[210px] lg:shrink-0
          "
        >
          <label htmlFor="category" className="sr-only">
            Filter by category
          </label>

          <select
            key={categoryParam}
            name="category"
            id="category"
            defaultValue={categoryParam}
            className="
              h-12 w-full rounded-xl
              border border-zinc-200
              px-3 sm:px-4
              text-sm sm:text-base
              leading-relaxed
              text-zinc-700
              outline-none
              focus:border-zinc-400
              focus:ring-1 focus:ring-zinc-200
            "
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div
          className="
            min-w-0
            lg:w-[150px] lg:shrink-0
          "
        >
          <label htmlFor="sortBy" className="sr-only">
            Sort by
          </label>

          <select
            key={sortByParam}
            name="sortBy"
            id="sortBy"
            defaultValue={sortByParam}
            className="
              h-12 w-full rounded-xl
              border border-zinc-200
              px-3 sm:px-4
              text-sm sm:text-base
              leading-relaxed
              text-zinc-700
              outline-none
              focus:border-zinc-400
              focus:ring-1 focus:ring-zinc-200
            "
          >
            <option value="">Sort by</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="lowest">Lowest first</option>
            <option value="highest">Highest first</option>
          </select>
        </div>

        {/* Search button */}
        <Button
          type="submit"
          className="
            h-12 w-full
            gap-2 rounded-xl
            px-2
            sm:px-3
            lg:w-auto
            lg:shrink-0
            lg:px-5
          "
        >
          <Search size={17} aria-hidden="true" />
          <span>Search</span>
        </Button>

        {/* Reset filters */}
        <div className="min-w-0 lg:shrink-0">
          <ResetFilteringButton />
        </div>
      </form>
    </section>
  );
}
