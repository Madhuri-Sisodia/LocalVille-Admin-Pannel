import React from "react";
const Loading = ({ isLoading, noData,image }) => {
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
            height:"100px",
            width:"100px",
          }}
        >
          <img src={image} alt="Image" />
        </div>
      )}
    </div>
  );
};
export default Loading;
