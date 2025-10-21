"use client";

import React from "react";

interface PaginationProps {
  pagination: {
    total: number;
    page: string | number;
    perPage: string | number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const currentPage = Number(pagination.page);
  const { totalPages, total, perPage } = pagination;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * Number(perPage) + 1;
  const endItem = Math.min(currentPage * Number(perPage), total);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center md:justify-between px-4 py-3 border-t border-gray-200">
      <div className="flex items-center text-sm text-gray-700 hidden md:block">
        Showing <span className="font-medium mx-1">{startItem}</span> to{" "}
        <span className="font-medium mx-1">{endItem}</span> of{" "}
        <span className="font-medium mx-1">{total}</span> results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              disabled={page === "..." || page === currentPage}
              className={`
                px-3 py-1 text-sm font-medium cursor-pointer rounded-md transition-colors
                ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : page === "..."
                    ? "bg-white text-gray-400 cursor-default"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
