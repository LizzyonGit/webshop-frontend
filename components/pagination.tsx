"use client";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
};

type PageItem = number | "ellipsis";

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                   }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const safeCurrentPage = Math.min(
        Math.max(currentPage, 1),
        Math.max(totalPages, 1)
    );

    function goToPage(page: number) {
        if (
            page < 1 ||
            page > totalPages ||
            page === safeCurrentPage
        ) {
            return;
        }

        const params = new URLSearchParams(
            searchParams.toString()
        );

        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }

        const queryString = params.toString();

        router.push(
            queryString
                ? `${pathname}?${queryString}`
                : pathname
        );
    }

    function getPageItems(): PageItem[] {
        if (totalPages <= 10) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        if (safeCurrentPage <= 6) {
            return [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                "ellipsis",
                totalPages,
            ];
        }

        if (safeCurrentPage >= totalPages - 5) {
            return [
                1,
                "ellipsis",
                totalPages - 7,
                totalPages - 6,
                totalPages - 5,
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "ellipsis",
            safeCurrentPage - 3,
            safeCurrentPage - 2,
            safeCurrentPage - 1,
            safeCurrentPage,
            safeCurrentPage + 1,
            safeCurrentPage + 2,
            safeCurrentPage + 3,
            "ellipsis",
            totalPages,
        ];
    }

    if (totalPages <= 1) {
        return null;
    }

    const pageItems = getPageItems();

    return (
        <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center"
        >
            <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                    type="button"
                    onClick={() =>
                        goToPage(safeCurrentPage - 1)
                    }
                    disabled={safeCurrentPage === 1}
                    aria-label="Go to previous page"
                    className="
            border
            border-border
            px-4
            py-2
            text-sm
            transition-colors
            hover:bg-surface
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
                >
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {pageItems.map((item, index) => {
                        if (item === "ellipsis") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="
                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    px-2
                    text-sm
                  "
                                    aria-hidden="true"
                                >
                  ...
                </span>
                            );
                        }

                        const active =
                            item === safeCurrentPage;

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => goToPage(item)}
                                aria-current={
                                    active ? "page" : undefined
                                }
                                aria-label={`Go to page ${item}`}
                                className={`
                  flex
                  h-10
                  min-w-10
                  items-center
                  justify-center
                  border
                  border-border
                  px-3
                  text-sm
                  transition-colors
                  ${
                                    active
                                        ? "font-semibold"
                                        : "hover:bg-surface"
                                }
                `}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    type="button"
                    onClick={() =>
                        goToPage(safeCurrentPage + 1)
                    }
                    disabled={
                        safeCurrentPage === totalPages
                    }
                    aria-label="Go to next page"
                    className="
            border
            border-border
            px-4
            py-2
            text-sm
            transition-colors
            hover:bg-surface
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
                >
                    Next
                </button>

            </div>
        </nav>
    );
}