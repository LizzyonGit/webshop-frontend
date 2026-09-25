import NavigationBar from "@/components/navigation-bar";

export default async function Home() {
    return (
        <main className="min-h-screen">
            <div className="container max-w-7xl mx-auto px-6 py-6">
                <NavigationBar />
            </div>
        </main>
    )
}