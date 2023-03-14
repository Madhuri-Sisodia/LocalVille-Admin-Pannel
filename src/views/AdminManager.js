import React, { useState } from "react";
import { Form, Button, ButtonToolbar } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import NotificationAlert from "react-notification-alert";
import "../assets/css/admin.css";
import { Http } from "../config/Service";
import { apis } from "../config/WebConstant";

const AdminManager = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});

  const notificationAlertRef = React.useRef(null);

  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Admin Details Successfully Added..!!</b>
          </div>
        </div>
      ),
      type: "success",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  const validate = () => {
    let tempErrors = {};
    if (!name) {
      tempErrors.name = "Name is required";
    }
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 5) {
      tempErrors.password = "Password must be at least 5 characters long";
    }
    if (!rePassword) {
      tempErrors.rePassword = "Re-entered password is required";
    } else if (password !== rePassword) {
      tempErrors.rePassword = "Password do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (validate()) {
      var data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);

     
      Http.PostAPI(process.env.REACT_APP_ADDADMINDATA, data, null)
        .then((res) => {
          console.log("user", res.data.status);
          if (res?.data?.status){
            setUser(res?.data?.data);
          } else {
            alert("Fields not matched");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
        });
      setName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setErrors({});
      notify("tr");
    }
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <h5>ADD ADMIN</h5>

          <Form
            fluid
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="InnnerContainerAdmin">
              <Form.Group>
                <Form.ControlLabel style={{ color: "#808080" }}>
                  ADMIN NAME
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Admin Name"
                  name="adminName"
                  value={name}
                  onChange={(value) => setName(value)}
                />
                {errors.name && <ErrorMessage message={errors.name} />}
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>ADMIN EMAIL</Form.ControlLabel>
                <Form.Control
                  placeholder="Admin Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(value) => setEmail(value)}
                />
                {errors.email && <ErrorMessage message={errors.email} />}
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>CREATE PASSWORD</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={password}
                  onChange={(value) => setPassword(value)}
                />
                {errors.password && <ErrorMessage message={errors.password} />}
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>RE-ENTER PASSWORD</Form.ControlLabel>
                <Form.Control
                  name="rePassword"
                  type="password"
                  placeholder="Re-enter Password"
                  autoComplete="off"
                  value={rePassword}
                  onChange={(value) => setRePassword(value)}
                />
                {errors.rePassword && (
                  <ErrorMessage message={errors.rePassword} />
                )}
              </Form.Group>
            </div>
            <button
              type="submit"
              block
              style={{
                backgroundColor: "blueviolet",
                border: "blueviolet",
                borderRadius: "3px 3px 3px 3px",
                width: "100%",
                padding: "10px",
                color: "white",
                marginTop: "20px",
                fontSize: "0.9rem",
              }}
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminManager;
