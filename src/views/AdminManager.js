import React, { useState } from "react";
import { Form, Button, ButtonToolbar, Schema, model, Message } from "rsuite";
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

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    adminName: StringType().isRequired("Admin field is required."),
    email: StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("Email field is required."),
    password: StringType()
      .isRequired("Password field is required.")
      .minLength(8, "Password must be at least 8 characters long."),
    rePassword: StringType()
      .isRequired("Re-enter Password field is required.")
      .addRule((value, formData) => {
        if (value !== formData.password) {
          return "Passwords do not match.";
        }
      }, "Passwords do not match."),
  });

  const handleSubmit = (e) => {
    // const validationErrors = model.validate({
    //   adminName: name,
    //   email,
    //   password,
    //   rePassword,
    // });
 
      // if (Object.keys(validationErrors).length === 0) {
      var data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);

      Http.PostAPI(process.env.REACT_APP_ADDADMINDATA, data, null)

        .then((res) => {
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
   
      // setErrors(validationErrors);
    
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
    setErrors({});
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
            model={model}
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
                {errors.adminName && <Message>{errors.adminName}</Message>}
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
                {errors.email && <Message>{errors.email}</Message>}
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
                {errors.password && <Message>{errors.password}</Message>}
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
                {errors.rePassword && <Message>{errors.rePassword}</Message>}
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
