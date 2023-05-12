import React, { useState, useEffect, useContext } from "react";
import ErrorMessage from "customComponents/ErrorMessage";
import { useHistory } from "react-router-dom";
import { Form, Button, Panel, Loader, InputGroup, Input } from "rsuite";
import "../../assets/css/login.css";
import LoginNavbar from "components/Navbars/LoginNavbar";
import { Http } from "../../config/Service";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Loading from "customComponents/Loading";
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnloading] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const notificationAlertRef = React.useRef(null);

  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      history.push("/admin/dashboard");
    } else if (!sessionStorage.getItem("loggedIn")) {
      history.push("/login");
    }
    setIsLoading(false);
  }, [history]);

  const validate = () => {
    let tempErrors = {};

    if (!email) {
      tempErrors.email = notificationAlertRef.current.notificationAlert(
        ErrorNotify("Email and Password Required")
      );
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = notificationAlertRef.current.notificationAlert(
        ErrorNotify("Email is invalid")
      );
    }

    if (password.length < 8) {
      tempErrors.password = notificationAlertRef.current.notificationAlert(
        ErrorNotify("Password must be at least 8 characters long")
      );
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      var data = new FormData();
      data.append("email", email);
      data.append("password", password);

      setBtnloading(true);

      Http.PostAPI(process.env.REACT_APP_LOGINADMINDATA, data, null)
        .then((res) => {
          setBtnloading(false);
          if (res?.data?.status) {
            setUser(res?.data?.data);
            console.log(res?.data?.data);
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
          setBtnloading(false)
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
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div>
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
                    <InputGroup inside style={{width: "auto"}} >
                      <Form.Control
                        name="password"
                        // type="password"
                        type={visible ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="off"
                        style={{ width: 400 , height: 50 }}
                        value={password}
                        required="password"
                        onChange={(value) => setPassword(value)}
              
                      />
                      <InputGroup.Button onClick={handleChange} style={{fontSize:"18px", marginTop:"8px"}}>
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
                    {errors.password && (
                      <ErrorMessage message={errors.password} />
                    )}
                  </Form.Group>

                  <div align="center">
                    <Button
                      disabled={btnLoading}
                      style={{ padding: "15px 180px" }}
                      appearance="primary"
                      type="submit"
                      className="loginButton"
                      onClick={handleSubmit}
                    >
                      {btnLoading ?
                        <Loader /> : <b>LOGIN</b>
                      }

                    </Button>
                  </div>
                </Form>
              </Panel>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
