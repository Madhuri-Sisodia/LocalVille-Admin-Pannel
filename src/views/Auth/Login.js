import React, { useState} from "react";
 import { useHistory } from "react-router-dom";
import { Form, Button } from "rsuite";
// import { Http } from "../../config/Service";
// import { apis } from "../../config/WebConstant";
import './Login.css';
import logoWhite from '../../images/logoWhite.png'
import LoginNavbar from "components/Navbars/LoginNavbar";

const Login = () => {
  const history = useHistory();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("Email", email);
    console.log("Password", password);
    const data1 = { email, password };
    localStorage.setItem("userData", JSON.stringify(data1));
     history.push("/admin");

    // var data = new FormData();
    // data.append("mail", data1.email);
    // data.append("password", data1.password);

    // console.log("usersss", data);
    // Http.PostAPI(apis.getUser, data, null)
    // .then((res) => {
    //     console.log("user", res);
    //     if (res?.data?.status) {
    //       setUser(res?.data?.data);
    //       localStorage.setItem("userData", JSON.stringify(res.data.data));
    //       navigate("/registration");
    //     } else {
    //       alert("Fields not matched");
    //     }
    //   })
    //   .catch((e) => {
    //     alert("Something went wrong.");
    //     console.log("Error:", e);
    //   });
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
