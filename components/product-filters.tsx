import { Search } from 'lucide-react';
import { Button } from './ui/button';
import Input from './ui/input';

export default function ProductFiltering() {
  return (
    <section className="mb-3" aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">
        Search and filter products
      </h2>
      <form action="/" method="GET" className="bg-white border items-center rounded-xl border-zinc-200 flex p-4 gap-4 mt-6 text-sm">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input type="search" name="search" id="search" placeholder="Search products..." className="border  rounded-xl border-zinc-200  p-2 grow-7" />

        <Button type="submit" className="border border-zinc-200  rounded-sm flex gap-2 p-2 justify-center">
          {' '}
          <Search size={18} fill="black" aria-hidden="true" />
          Search
        </Button>
      </form>
    </section>
  );
}
