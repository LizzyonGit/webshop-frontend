import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

export default async function Home() {
    return (
        <main className="min-h-screen">
            <div className="container max-w-7xl mx-auto px-6 py-6">
                <NavigationBar />
                <Hero />
            </div>
            <Footer />
        </main>
    )
}
