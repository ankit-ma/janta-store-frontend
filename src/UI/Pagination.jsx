import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  // console.log("CurrentPage", currentPage);
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center space-x-2">
        <li>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => {
              return onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 0}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {number + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages - 1
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
