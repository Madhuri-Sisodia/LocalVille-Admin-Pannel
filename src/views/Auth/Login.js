import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "rsuite";
import logoWhite from "assets/img/logoWhite.png";
import "../../assets/css/login.css";
import LoginNavbar from "components/Navbars/LoginNavbar";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[errors,setErrors] = useState({});


  const validate = () => {
    let tempErrors = {};
    
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (validate()) {
    console.log("Email", email);
    console.log("Password", password);
    const data = { email, password };
    sessionStorage.setItem("loggedIn", JSON.stringify(data));
    history.push("/admin");

    setEmail("");
    setPassword("");
    }
    };
    
  

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      history.push("/admin");
    } else if (!sessionStorage.getItem("loggedIn")) {
      history.push("/login");
    }
  }, [history]);

  return (
    <>
      <LoginNavbar />
      <div className="LoginContainer">
        <div className="FirstSection">
          <img src={logoWhite} className="adminLogo" />
          <p className="textArea">LOCALVILLE VENDOR</p>
        </div>
        <div className="SecondSection">
          <Form style={{ textAlign: "left" }} onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.ControlLabel style={{ color: "white" }}>
                Email
              </Form.ControlLabel>
              <Form.Control
                name="email"
                placeholder="Email"
                style={{ width: 300 }}
                value={email}
                required="email"
                onChange={(value) => setEmail(value)}
              />
              {errors.email && (
                  <p className="error">{errors.email}</p>
                )}
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
              {errors.password && (
                  <p className="error">{errors.password}</p>
                )}
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
