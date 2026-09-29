import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

import ProductsTable from "@/components/products-table";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    stock?: string;
    query?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
    return (
        <main className="min-h-screen">
            <div className="container max-w-7xl mx-auto px-6 py-6">
                <NavigationBar />
                <Hero />
                <ProductsTable searchParams={searchParams}/>
            </div>
            <Footer />
        </main>
    )
}
