import React, { useState, useRef } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Avatar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Modal from "rsuite/Modal";
import { event } from "jquery";
import { Uploader, Message, Loader, useToaster } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [category, setCategory] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setErrorMessage("image upload success");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000); // set timer for 2 seconds
    } else {
      setImageFile(null);
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    var data = new FormData();
    data.append("section_name", sectionName);
    data.append("section_image", imageFile);

    Http.PostAPI(process.env.REACT_APP_ADDCATEGORYSECTION, data)
      .then((res) => {
        if (res?.data?.status) {
          setCategory(res?.data?.data);
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
    setSectionName("");
    setImageFile("");
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form.ControlLabel
            style={{
              color: "#808080",
              fontSize: "0.9rem",
              marginTop: "1em",
              PaddingTop: "20px",
            }}
          >
            Add Section Image
          </Form.ControlLabel>
          <Form.Group>
            <div>
              {showNotification && errorMessage && (
                <div style={{ color: "green" }}>{errorMessage}</div>
              )}
              {imageFile ? (
                <div>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Avatar"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  />
                  <div style={{ marginTop: "1em" }}>
                    <button onClick={handleRemoveImage}>Remove Image</button>
                  </div>
                </div>
              ) : (
                <div style={{ overflow: "hidden" }}>
                  <label htmlFor="avatar-upload">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Avatar Placeholder"
                      style={{ borderRadius: "50%", width: "70px" }}
                    />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
          </Form.Group>
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group controlId="name-1">
              <Form.ControlLabel
                style={{
                  color: "#808080",
                  fontSize: "1rem",
                  marginTop: "10px",
                }}
              >
                Add Category Section
              </Form.ControlLabel>
              <input
                type="text"
                required
                value={sectionName}
                placeholder="Enter Category Section"
                onChange={(e) => {
                  setSectionName(e.target.value);
                }}
                style={{
                  width: "100%",
                  height: "30px",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "20px",
                }}
              />
            </Form.Group>

            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                  block
                >
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Section;
