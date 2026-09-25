"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { CATEGORIES } from "@/lib/constants/categories";
import { SORT_OPTIONS } from "@/lib/constants/sort-options";

export default function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();

    const currentSearch = searchParams.get("search") ?? "";
    const currentCategory = searchParams.get("category") ?? "";
    const currentSort = searchParams.get("sort") ?? "newest";

    const [search, setSearch] = useState(currentSearch);

    function updateUrl(
        key: string,
        value: string
    ) {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        startTransition(() => {
            router.push(`/products?${params.toString()}`);
        });
    }

    function handleSearch(event: React.FormEvent) {
        event.preventDefault();

        updateUrl("search", search.trim());
    }

    function handleCategory(value: string) {
        updateUrl("category", value);
    }

    function handleSort(value: string) {
        updateUrl("sort", value);
    }

    function clearFilters() {
        setSearch("");

        startTransition(() => {
            router.push("/products");
        });
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="flex gap-2"
            >
                <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search products..."
                    className="
            flex-1
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-black
          "
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="
            bg-black
            px-6 py-3
            text-white
            disabled:opacity-50
          "
                >
                    {isPending ? "Searching..." : "Search"}
                </button>
            </form>

            {/* Category */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="font-medium"
                >
                    Category
                </label>

                <select
                    id="category"
                    value={currentCategory}
                    onChange={(event) =>
                        handleCategory(event.target.value)
                    }
                    className="
            border border-gray-300
            px-4 py-3
            bg-white
          "
                >
                    <option value="">
                        All categories
                    </option>

                    {CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="sort"
                    className="font-medium"
                >
                    Sort by
                </label>

                <select
                    id="sort"
                    value={currentSort}
                    onChange={(event) =>
                        handleSort(event.target.value)
                    }
                    className="
            border border-gray-300
            px-4 py-3
            bg-white
          "
                >
                    {SORT_OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Clear */}
            {(currentSearch ||
                currentCategory ||
                currentSort !== "newest") && (
                <button
                    type="button"
                    onClick={clearFilters}
                    className="
            self-start
            border border-gray-300
            px-4 py-2
            hover:border-black
          "
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}