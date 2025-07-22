import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  maxPaginationLimit: number;
  minPaginationLimit: number;
  maxPagination: number;
  onPageClick: (page: number) => void;
}

function PaginationControls({
  currentPage,
  maxPaginationLimit,
  minPaginationLimit,
  maxPagination,
  onPageClick,
}: PaginationControlsProps) {
  const minPaginationNumber = Math.min(maxPagination, minPaginationLimit);

  if (maxPagination <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageClick(Math.max(currentPage - 1, 1))}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>
        {/* pagination numbers (e.g. 1 2 3 4 5 6 ... 10 11 12) if e.g. current page = 4 */}
        {Array.from(
          {
            length:
              currentPage > maxPaginationLimit
                ? minPaginationLimit
                : Math.min(
                    maxPagination - minPaginationLimit,
                    Math.max(currentPage + 1, minPaginationLimit),
                  ),
          },
          (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => onPageClick(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {((currentPage + 1 < maxPagination - minPaginationLimit &&
          maxPagination - minPaginationLimit > minPaginationLimit) ||
          currentPage > maxPaginationLimit) && (
          <PaginationItem>
            <PaginationEllipsis
              onClick={() =>
                onPageClick(
                  Math.min(
                    currentPage + (currentPage > maxPaginationLimit ? -2 : 2),
                    maxPagination,
                  ),
                )
              }
            />
          </PaginationItem>
        )}
        {/* pagination numbers (e.g. 1 2 3 ... 6 7 8 ... 10 11 12 ) if e.g. current page = 7 */}
        {currentPage > maxPaginationLimit && (
          <React.Fragment>
            {Array.from(
              { length: Math.min(maxPagination - currentPage - 1, minPaginationLimit) },
              (_, index) => (
                <PaginationItem key={currentPage + index - 1}>
                  <PaginationLink
                    isActive={currentPage === currentPage + index - 1}
                    onClick={() => onPageClick(currentPage + index - 1)}
                  >
                    {currentPage + index - 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            {/* hidden (1 2 3 ... 8 9 10 11 12 13) if e.g current page = 9 */}
            {currentPage + 1 < maxPagination - minPaginationLimit && (
              <PaginationItem>
                <PaginationEllipsis onClick={() => onPageClick(currentPage + 2)} />
              </PaginationItem>
            )}
          </React.Fragment>
        )}
        {/* last pagination numbers (e.g. 1 2 3 ... 8 9 10) */}
        {Array.from({ length: minPaginationNumber }, (_, index) => {
          const number = Math.max(maxPagination - minPaginationLimit, 0) + index + 1;

          return (
            <PaginationItem key={number}>
              <PaginationLink isActive={currentPage === number} onClick={() => onPageClick(number)}>
                {number}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageClick(Math.min(currentPage + 1, maxPagination))}
            aria-disabled={currentPage >= maxPagination}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationControls;
