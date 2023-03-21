import { Navbar, Nav } from "rsuite";
import React, { useState } from "react";

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand style={{ color: "white",position:"fixed" }}>
        <img
        src={require('./../../assets/img/logoWhite.png')}
        style={{
          height:40,
          width:40
        }}
        />
        <span style={{
          fontSize:20,
          marginLeft:10
        }}>
        <b>LOCALVILLE</b> ADMIN
        </span>
      </Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}></Nav>
    </Navbar>
  );
};

const LoginNavbar = () => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <>
      <CustomNavbar
        style={{ backgroundColor: "blueviolet", position:"fixed" }}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
    </>
  );
};

export default LoginNavbar;
