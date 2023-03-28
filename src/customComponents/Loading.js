import React from "react";
const Loading = ({ isLoading, noData }) => {
  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            fontSize: "0.9rem",
            color: "gray",
            margin: "50px",
          }}
        >
          Loading....
        </div>
      )}

      {!isLoading && noData && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            fontSize: "1rem",
            color: "gray",
            margin: "50px",
          }}
        >
          Data Not Found
        </div>
      )}
    </div>
  );
};
export default Loading;
