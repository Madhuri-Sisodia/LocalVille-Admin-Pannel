import React from "react";
import { Pagination } from "rsuite";

const Pages = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Pagination
        prev
        next
        first
        last
        total={100}
        limit={totalPages}
        maxButtons={5}
        size="md"
        activePage={currentPage}
        totalPages={totalPages}
        onSelect={handlePageChange}
      />
      {/* Media queries for mobile screens
      <style jsx>{`
        @media (max-width: 360px) {
          .rs-pagination {
            font-size: 12px;
          }
          .rs-pagination-btn-group button {
            padding: 0 4px;
          }
        }
      `}</style> */}
    </div>
  );
};

export default Pages;
