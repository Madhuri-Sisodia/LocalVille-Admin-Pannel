import React, { useState, useEffect, useContext } from "react";
import ErrorMessage from "customComponents/ErrorMessage";
import { useHistory } from "react-router-dom";
import { Form, Button, Panel } from "rsuite";
import logoWhite from "assets/img/logoWhite.png";
import "../../assets/css/login.css";
import LoginNavbar from "components/Navbars/LoginNavbar";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import User from "views/UserProfile";
import { Utils } from "CommonUtils/Utils";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const notificationAlertRef = React.useRef(null);

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
    e.preventDefault();
    if (validate()) {
      console.log("Email", email);
      console.log("Password", password);
      const loginData = { email, password };
      var data = new FormData();
      data.append("email", email);
      data.append("password", password);

      console.log("usersss", data);
      Http.PostAPI(process.env.REACT_APP_LOGINADMINDATA, data, null)
        .then((res) => {
          if (res?.data?.status) {
            setUser(res?.data?.data);
            notificationAlertRef.current.notificationAlert(
              SuccessNotify(res?.data?.message)
            );
            sessionStorage.setItem(
              "loggedIn",
              JSON.stringify(res.data.data.token)
            );
            sessionStorage.setItem("name", res.data.data.name);

            history.push("/admin/dashboard");
          } else {
            notificationAlertRef.current.notificationAlert(
              ErrorNotify(res?.data?.message)
            );
          }
        })
        .catch((e) => {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <LoginNavbar />
      <div className="LoginContainer">
        <div className="FirstSection">
          {/* <img src={logoWhite} className="adminLogo" /> */}
          <Player
            autoplay
            loop
            src={require("./../../assets/animations/login_admin2.json")}
            style={{ height: "550px", width: "550px" }}
          ></Player>
          {/* <p className="textArea" style={{marginTop:-30}}>LOCALVILLE ADMIN</p> */}
        </div>
        <div className="SecondSection">
          <Panel style={{ paddingTop: 50, paddingBottom: 50 }} shaded>
            <Form style={{ textAlign: "left" }}>
              <Form.Group controlId="email">
                <Form.ControlLabel style={{ color: "white" }}>
                  EMAIL
                </Form.ControlLabel>
                <Form.Control
                  name="email"
                  placeholder="Email"
                  style={{ width: 400, height: 50 }}
                  value={email}
                  required="email"
                  onChange={(value) => setEmail(value)}
                />
                {errors.email && <ErrorMessage message={errors.email} />}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.ControlLabel style={{ color: "white" }}>
                  PASSWORD
                </Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  style={{ width: 400, height: 50 }}
                  value={password}
                  required="password"
                  onChange={(value) => setPassword(value)}
                />
                {errors.password && <ErrorMessage message={errors.password} />}
              </Form.Group>

              <div align="center">
                <Button
                  style={{ padding: "15px 180px" }}
                  appearance="primary"
                  type="submit"
                  className="loginButton"
                  onClick={handleSubmit}
                >
                  <b>LOGIN</b>
                </Button>
              </div>
            </Form>
          </Panel>
        </div>
      </div>
    </>
  );
};

export default Login;
