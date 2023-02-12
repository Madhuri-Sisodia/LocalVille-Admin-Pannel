import React, { useState, useEffect } from "react";
import ErrorMessage from "customComponents/ErrorMessage";
import { useHistory } from "react-router-dom";
import { Form, Button } from "rsuite";
import logoWhite from "assets/img/logoWhite.png";
import "../../assets/css/login.css";
import LoginNavbar from "components/Navbars/LoginNavbar";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 7) {
      tempErrors.password = "Password must be at least 7 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (validate()) {
      console.log("Email", email);
      console.log("Password", password);
      const loginData = { email, password };
      var data = new FormData();
      data.append("email", data.email);
      data.append("password", data.password);

      console.log("usersss", data);
      Http.PostAPI(apis.loginAdminData, data, null)
        .then((res) => {
          console.log("user", res);
          if (res?.data?.status) {
            setUser(res?.data?.data);
            sessionStorage.setItem("loggedIn", JSON.stringify(loginData));
            history.push("/admin/dashboard");
          } else {
            alert("Fields not matched");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
        });
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      history.push("/admin/dashboard");
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
              {errors.email && <ErrorMessage message={errors.email} />}
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
              {errors.password && <ErrorMessage message={errors.password} />}
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
