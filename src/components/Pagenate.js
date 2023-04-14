import React, { useState } from "react";
import { Pagination } from "rsuite";
import "../assets/css/pagination.css";

const Pagenate = ({ totalPages, onChange }) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
    onChange(page);
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
        total={totalPages}
        maxButtons={5}
        size="md"
        activePage={activePage}
        pages={totalPages}
        onSelect={handlePageChange}
        className="mobile-pagination"
      />
  
    </div>
  );
};

export default Pagenate;
