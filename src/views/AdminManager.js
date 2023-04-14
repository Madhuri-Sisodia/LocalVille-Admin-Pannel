import React, { useState } from "react";
import { Form, Button, ButtonToolbar } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import NotificationAlert from "react-notification-alert";
import "../assets/css/admin.css";
import { Http } from "../config/Service";
import ButtonComponent from "views/ButtonComponent";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const AdminManager = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const notificationAlertRef = React.useRef(null);

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

  // const handleBlur = (e) => {
  //   // manually validate form if all fields have been touched
  //   const touchedFields = Object.keys(name).filter(
  //     (field) => field === e.target.name || name[field]
  //   );
  //   if (touchedFields.length === Object.keys(name).length) {
  //     validate();
  //   }
  // };

  const handleSubmit = (e) => {
    if (validate()) {
      var data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);

      Http.PostAPI(process.env.REACT_APP_ADDADMINDATA, data, null)
        .then((res) => {
          console.log("user", res.data.status);
          if (res?.data?.status) {
            setUser(res?.data?.data);
            notificationAlertRef.current.notificationAlert(
              SuccessNotify(res?.data?.message)
            );
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
      setName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setErrors({});
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
                  onBlur={validate}
                  onChange={(value) => setName(value)}
                  className={
                    errors.name ? "form-control is-invalid" : "form-control"
                  }
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
                  onBlur={validate}
                  onChange={(value) => setEmail(value)}
                  className={
                    errors.email ? "form-control is-invalid" : "form-control"
                  }
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
                  onBlur={validate}
                  onChange={(value) => setPassword(value)}
                  className={
                    errors.password ? "form-control is-invalid" : "form-control"
                  }
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
                  onBlur={validate}
                  onChange={(value) => setRePassword(value)}
                  className={
                    errors.rePassword
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {errors.rePassword && (
                  <ErrorMessage message={errors.rePassword} />
                )}
              </Form.Group>
            </div>
            <ButtonComponent block buttontext="Submit" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminManager;
