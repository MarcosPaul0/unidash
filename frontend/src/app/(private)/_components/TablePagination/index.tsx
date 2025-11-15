"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@unidash/components/Pagination";
import { TablePaginationProps } from "./tablePagination.interface";
import { useSearchParams } from "next/navigation";

export function TablePagination({ totalPages }: TablePaginationProps) {
  const params = useSearchParams();

  const currentPage = params.get("page") ? Number(params.get("page")) : 1;

  if (totalPages <= 1) return null;

  const previousPageIsDisabled = currentPage <= 1;
  const nextPageIsDisabled = currentPage >= totalPages;

  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-4">
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            aria-disabled={previousPageIsDisabled}
          />
        </PaginationItem>

        <span className="font-bold">{currentPage}</span>

        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            aria-disabled={nextPageIsDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
