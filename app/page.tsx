import NavigationBar from '@/components/navigation-bar';
import Footer from '@/components/footer';
import Hero from '@/components/hero';

import ProductsTable from "@/components/products-table";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <NavigationBar />
        <Hero />
        <ProductsTable />
      </div>
      <Footer />
    </main>
  );
}
