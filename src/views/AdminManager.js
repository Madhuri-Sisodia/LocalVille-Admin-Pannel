import React, { useState } from "react";
import { Form, Button, ButtonToolbar, Schema, model, Message } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import NotificationAlert from "react-notification-alert";
import "../assets/css/admin.css";
import { Http } from "../config/Service";
import ButtonComponent from "views/ButtonComponent";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import {validationModel}  from "../components/Validation";

const AdminManager = () => {
  const [formValue, setFormValue] = useState({
    aName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [user, setUser] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const formRef = React.useRef();

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.log("FORM ERROR!");

      return;
    } else {
      console.log("form....", formValue);
      var data = new FormData();
      data.append("name", formValue.aName);
      data.append("email", formValue.email);
      data.append("password", formValue.password);

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
      setFormValue({
        aName: "",
        email: "",
        password: "",
        rePassword: "",
      });
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
            ref={formRef}
            model={validationModel}
            formValue={formValue}
            onSubmit={handleSubmit}
            onChange={setFormValue}
          >
            <div className="InnnerContainerAdmin">
              <Form.Group>
                <Form.ControlLabel style={{ color: "#808080" }}>
                  ADMIN NAME
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Admin Name"
                  name="aName"
                  value={formValue.aName}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>ADMIN EMAIL</Form.ControlLabel>
                <Form.Control
                  placeholder="Admin Email"
                  name="email"
                  type="email"
                  value={formValue.email}
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>CREATE PASSWORD</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={formValue.password}
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>RE-ENTER PASSWORD</Form.ControlLabel>
                <Form.Control
                  name="rePassword"
                  type="password"
                  placeholder="Re-enter Password"
                  autoComplete="off"
                  value={formValue.rePassword}
                />
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
