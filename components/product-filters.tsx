import { Search } from 'lucide-react';
import { Button } from './ui/button';
import Input from './ui/input';
import ResetFilteringButton from './reset-filter-button';

export default function ProductFiltering() {
  return (
    <section className="mb-6" aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">
        Search and filter products
      </h2>

      <form
        action="/"
        method="GET"
        className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white

 p-4 shadow-sm"
      >
        <label htmlFor="search" className="sr-only">
          Search products
        </label>

        {/* Search on products*/}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <Input type="search" name="search" id="search" placeholder="Search products..." className="h-10 rounded-xl  border-zinc-200 pl-10 shadow-none focus-visible:ring-1" />
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
