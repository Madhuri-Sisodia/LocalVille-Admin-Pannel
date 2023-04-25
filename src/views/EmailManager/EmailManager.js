import { useState, useEffect } from "react";
import React from "react";
import { Form } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../../assets/css/admin.css";
import MultipleSelect from "components/multipleSelect";
import { Http } from "config/Service";
import MyComponent from "components/React-Quil-text-Editor";
import { Data } from "@react-google-maps/api";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const EmailManager = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const notificationAlertRef = React.useRef(null);

  const getVendors = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(),
      data,
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          // alert("Fields not matched");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };

  useEffect(() => {
    getVendors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form
            fluid
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group>
              <Form.ControlLabel>VENDORS</Form.ControlLabel>
              <MultipleSelect
                data={data}
                setSelectedVendors={setSelectedVendors}
                selectedVendors={selectedVendors}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>TITLE</Form.ControlLabel>
              <Form.Control
                placeholder="Vendor Title"
                name="title"
                value={title}
                onChange={(value) => setTitle(value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>MESSAGE</Form.ControlLabel>
              <MyComponent />
            </Form.Group>
            <ButtonComponent  buttontext="Submit" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmailManager;
