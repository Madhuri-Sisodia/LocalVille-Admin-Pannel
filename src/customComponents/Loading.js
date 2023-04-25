import React from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
const Loading = ({ isLoading, noData, image }) => {
  return (
    <div>
      {isLoading && (
      
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            margin: "50px",
          }}
        >
          <TailSpin height="45" width="45" color="grey" ariaLabel="loading" />
        </div>
      )}

      {!isLoading && noData && (
        <div
          style={{
            height: "100px",
            width: "100px",
          }}
        >
          <img src={image} alt="Image" />
        </div>
      )}
    </div>
  );
};
export default Loading;
