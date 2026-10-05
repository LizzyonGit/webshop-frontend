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
} from '@/components/ui/pagination';

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
    /*
     * 5 or fewer pages:
     *
     * 1 2 3 4 5
     */
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    /*
     * Near beginning:
     *
     * 1 2 3 ... 16
     */
    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 'ellipsis', totalPages];
    }

    /*
     * Near end:
     *
     * 1 ... 14 15 16
     */
    if (safeCurrentPage >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
    }

    /*
     * Middle:
     *
     * 1 ... 7 8 9 ... 16
     */
    return [1, 'ellipsis', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, 'ellipsis', totalPages];
  }

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems();

  return (
    <ShadcnPagination className="w-full pbs-6 pbe-6">
      <PaginationContent className="gap-1 pbs-2">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToPage(safeCurrentPage - 1);
            }}
            className={`
              h-8 w-8 p-0
              sm:h-9 sm:w-auto sm:px-3
              ${safeCurrentPage === 1 ? 'pointer-events-none opacity-40' : ''}
            `}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="h-8 w-8" />
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
                className="h-8 w-8 p-0"
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
            className={`
              h-8 w-8 p-0
              sm:h-9 sm:w-auto sm:px-3
              ${safeCurrentPage === totalPages ? 'pointer-events-none opacity-40' : ''}
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
