import React from 'react';
import "../assets/css/admin.css";


const ButtonComponent = (props) => {
  return (
    
        <button 
        className="buttonComponent"
        type="submit"
         style={{
                backgroundColor: "#ac74e1",
                border: "blueviolet",
                borderRadius: "10px",
                width: "81%",
                padding: "10px",
                color: "white",
                marginTop: "20px",
                fontSize: "0.9rem",
                fontWeight:"600",
                textAlign:"center"
              }}  
        >
           {props.buttontext}  
        </button>
  
  )
}

export default ButtonComponent;