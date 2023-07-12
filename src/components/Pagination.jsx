import React from "react";

const Pagination = ({ page, pages, handlePageChange }) => {
  return (
    <div>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          style={{
            borderRadius: "50%",
            border: "none",
            padding: "5px",
            background: page === p ? "#fff" : "#f6cc9f",
            color: page === p ? "#333" : "#fff",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
