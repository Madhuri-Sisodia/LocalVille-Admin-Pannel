import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Button,
  ButtonToolbar,
  SelectPicker,
  Checkbox,
} from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../assets/css/admin.css";
import NotificationAlert from "react-notification-alert";
import { Http } from "config/Service";
import ButtonComponent from "./ButtonComponent";
import MultipleSelect from "components/MultipleSelect";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

const NotificationManager = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [addNotification, setAddNotification] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [btnLoading, setBtnloading] =useState (false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setErrorMessage(null);
  };

  const getVendors = () => {
    Http.GetAPI(process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(), "")
      .then((res) => {
        if (res?.data?.status) {
          setVendorData(res?.data?.dropdown_data);
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
    if (!imageFile) {
      setErrorMessage("Image is required");
      return;
    }
    let arr = [];
   

    var data = new FormData();
    for (let i = 0; i < vendorData.length; i++) {
      for (let j = 0; j < selectedVendors.length; j++) {
        if (vendorData[i].email == selectedVendors[j].value) {
          data.append("vendors[]", vendorData[i].id);
        }
      }
    }
   
    console.log("selectedVendors", selectedVendors);

    data.append("img", imageFile);
    data.append("title", title);
    data.append("message", message);
    setBtnloading(true);

    Http.PostAPI(process.env.REACT_APP_ADDNOTICATIONMANAGER, data)
      .then((res) => {
        setBtnloading(false);
        console.log("Notification", res);
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
        setBtnloading(false);
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
    setSelectedVendors([]);
    setImageFile("");
    setTitle("");
    setMessage("");
    setErrorMessage("");
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
              <Form.ControlLabel htmlFor="file">IMAGE</Form.ControlLabel>
              <div>
                {imageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Avatar"
                      style={{
                        width: "50px",
                        height: "60px",
                        borderRadius: "11px",
                      }}
                    />

                    {/* <div style={{ marginTop: "1em" }}>
                      <button onClick={handleRemoveImage}>Remove Image</button>
                    </div> */}
                  </div>
                ) : (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor="avatar-upload">
                      <div
                        style={{
                          color:"blueviolet",
                          width: "55px",
                          height: "55px",
                          border: "1px dotted",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CameraRetroIcon style={{ fontSize: "35px" }} />
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>TITLE</Form.ControlLabel>
              <Form.Control
                placeholder="Title"
                name="title"
                value={title}
                onChange={(value) => setTitle(value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>MESSAGE</Form.ControlLabel>
              <Input
                style={{ height: "150px" }}
                as="textarea"
                rows={4}
                maxLength={300}
                placeholder=" Message"
                name="message"
                type="textarea"
                value={message}
                onChange={(value) => setMessage(value)}
              />
              {/* <Input as="textarea" rows={3} placeholder="Textarea" value={formValue.message} /> */}
            </Form.Group>

            <ButtonComponent block buttontext="Submit"
            btnLoading={btnLoading} />
          </Form>
        </div>
      </div>
    </>
  );
};
export default NotificationManager;
