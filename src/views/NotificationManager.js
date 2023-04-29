import React, { useState, useEffect,useRef } from "react";
import { Form, Button, ButtonToolbar, SelectPicker, Checkbox } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../assets/css/admin.css";
import NotificationAlert from "react-notification-alert";
import { Http } from "config/Service";
import ButtonComponent from "./ButtonComponent";
import MultipleSelect from "components/MultipleSelect";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const NotificationManager = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [addNotification, setAddNotification] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const fileInputRef = useRef(null);

  const getVendors = () => {
    Http.GetAPI(process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(), "")
      .then((res) => {
       
        if (res?.data?.status) {
          setVendorData(res?.data?.data);
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
    // e.preventDefault();
    let arr = [];

   
    var data = new FormData();
    for (let i = 0; i < vendorData.length; i++) {
      for (let j = 0; j < selectedVendors.length; j++) {
        if (vendorData[i].email == selectedVendors[j].value) {
          data.append("vendors[]", vendorData[i].id);
        }
      }
    }

    data.append("img", image);
    data.append("title", title);
    data.append("message", message);

    Http.PostAPI(process.env.REACT_APP_ADDNOTICATIONMANAGER, data)
      .then((res) => {
        console.log("Notification",res)
        if (res?.data?.status) {
          setAddNotification(res?.data?.data);
          getVendors();
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
    // setSelectedVendors("");
    // fileInputRef.current.value = "";
    // setImage(null);
    // setTitle("");
    // setMessage("");
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
              {/* <SelectPicker
                data={vendors}
                name="vendors"
                placeholder="Select vendors"
                style={{ width: 300 }}
                value={selectedVendors}
                onChange={(value) => setSelectedVendors(value)}
                searchable={false}
                required
              /> */}
              <MultipleSelect
                data={vendorData}
                setSelectedVendors={setSelectedVendors}
                selectedVendors={selectedVendors}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>IMAGE</Form.ControlLabel>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                name="image"
                required
                accept="image/jpeg, image/png, image/jpg"
                // onChange={(e) => {
                //   setImage(e.target.files[0]);
                // }}
                ref={fileInputRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>TITLE</Form.ControlLabel>
              <Form.Control
                placeholder="Title"
                name="title"
                value={title}
                onChange={(value) => setTitle(value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>MESSAGE</Form.ControlLabel>
              <Form.Control
                style={{ height: "150px" }}
                componentClass="textarea"
                rows={4}
                maxLength={300}
                placeholder=" Message"
                name="message"
                type="textarea"
                value={message}
                onChange={(value) => setMessage(value)}
                required
              />
            </Form.Group>
            <ButtonComponent block buttontext="Submit" />
          </Form>
        </div>
      </div>
    </>
  );
};
export default NotificationManager;
