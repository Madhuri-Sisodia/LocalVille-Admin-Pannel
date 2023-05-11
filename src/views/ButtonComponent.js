import React, { useState } from 'react';
import "../assets/css/admin.css";
import { Form, Button, Panel, Loader } from "rsuite";


const ButtonComponent = (props) => {
  return (
    <div>

      <button
        className="buttonComponent"
        type="submit"
        style={{
          backgroundColor: "blueviolet",
          border: "blueviolet",
          borderRadius: "3px",
          width: "100%",
          padding: "10px",
          color: "white",
          marginTop: "20px",
          fontSize: "0.9rem",
          fontWeight: "600",
          textAlign: "center"
        }}
        disabled={props.btnLoading}
      >
        {props.btnLoading ?
          <Loader /> :
          props.buttontext
        }

      </button>

    </div>

  )
}

export default ButtonComponent;