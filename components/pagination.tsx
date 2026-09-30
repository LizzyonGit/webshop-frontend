'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

type PageItem = number | 'ellipsis';

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === safeCurrentPage) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function getPageItems(): PageItem[] {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 6) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 'ellipsis', totalPages];
    }

    if (safeCurrentPage >= totalPages - 5) {
      return [1, 'ellipsis', totalPages - 7, totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      'ellipsis',
      safeCurrentPage - 3,
      safeCurrentPage - 2,
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      safeCurrentPage + 2,
      safeCurrentPage + 3,
      'ellipsis',
      totalPages,
    ];
  }

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems();

  return (
    <ShadcnPagination>
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToPage(safeCurrentPage - 1);
            }}
            className={
              safeCurrentPage === 1
                ? "pointer-events-none opacity-40"
                : ""
            }
          />
        </PaginationItem>

        {/* Page numbers */}
        {pageItems.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const active = item === safeCurrentPage;

          return (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={active}
                onClick={(event) => {
                  event.preventDefault();
                  goToPage(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToPage(safeCurrentPage + 1);
            }}
            className={
              safeCurrentPage === totalPages
                ? "pointer-events-none opacity-40"
                : ""
            }
          />
        </PaginationItem>

      </PaginationContent>
    </ShadcnPagination>
  );


  
}
