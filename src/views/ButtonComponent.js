import React from 'react';
import "../assets/css/admin.css";


const ButtonComponent = (props) => {
  return (
    
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
                fontWeight:"600",
                textAlign:"center"
              }}  
        >
           {props.buttontext} 
            
        </button>
  
  )
}

export default ButtonComponent;