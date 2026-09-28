export const SORT_OPTIONS = [
    {
        value: "newest",
        label: "Newest",
    },
    {
        value: "oldest",
        label: "Oldest",
    },
    {
        value: "price-asc",
        label: "Price: Low to High",
    },
    {
        value: "price-desc",
        label: "Price: High to Low",
    },
    {
        value: "title-asc",
        label: "Name: A-Z",
    },
    {
        value: "title-desc",
        label: "Name: Z-A",
    },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];