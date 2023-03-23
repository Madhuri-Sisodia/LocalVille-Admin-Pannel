import React from "react";
const Loading = ({ isLoading }) => {
  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            fontSize:"0.9rem",
            color:"gray",
            margin:"50px",
          }}
        >
          Loading....
        </div>
      )}
    </div>
  );
};
export default Loading;
