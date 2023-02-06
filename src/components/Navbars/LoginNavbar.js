import { Navbar, Nav } from "rsuite";
import React, { useState } from "react";

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand style={{ color: "white" }}>LOCALVILLE</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}></Nav>
    </Navbar>
  );
};

const LoginNavbar = () => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <>
      <CustomNavbar
        style={{ backgroundColor: "blueviolet" }}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
    </>
  );
};

export default LoginNavbar;
