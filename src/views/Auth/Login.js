import React, { useState} from "react";
 import { useHistory } from "react-router-dom";
import { Form, Button } from "rsuite";
import '../../assets/css/login.css';
import logoWhite from "assets/img/logoWhite.png";
import LoginNavbar from "components/Navbars/LoginNavbar";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("Email", email);
    console.log("Password", password);
      const data = { email, password };
      sessionStorage.setItem("userData", JSON.stringify(data));
      history.push("/admin");
      setEmail("");
      setPassword("");
    };

  return (
    <>
    <LoginNavbar/>
    <div className="LoginContainer">
    <div className="FirstSection">
    <img src={logoWhite} className="adminLogo"/>
    <p className="textArea">LOCALVILLE VENDOR</p>
    </div>
    <div className="SecondSection">

    <Form
      style={{ textAlign: "left" }}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="email">
        <Form.ControlLabel style={{ color: "white" }}>Email</Form.ControlLabel>
        <Form.Control
          name="email"
          placeholder="Email"
          style={{ width: 300 }}
          value={email}
          required="email"
          onChange={(value) => setEmail(value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.ControlLabel style={{ color: "white" }}>
          Password
        </Form.ControlLabel>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          style={{ width: 300 }}
          value={password}
          required="password"
          onChange={(value) => setPassword(value)}
        />
      </Form.Group>

      <Button
        style={{ padding: "9px 132px" }}
        appearance="primary"
        type="submit"
        className="loginButton"
      >
        Login
      </Button>
    </Form>
    </div>
    </div>
    </>
  );
};

export default Login;
