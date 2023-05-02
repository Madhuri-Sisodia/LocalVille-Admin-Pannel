import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ color: 'red' , fontSize:"0.9rem" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;