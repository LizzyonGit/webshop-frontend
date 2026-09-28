import ProductForm from "@/components/product-form";

export default function NewProductPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">
                    Add new product
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    Create a new product in the catalog.
                </p>
            </div>

            <ProductForm />
        </main>
    );
}