import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Avatar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Modal from "rsuite/Modal";
import { Uploader } from "rsuite";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [category, setCategory] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("section_name", sectionName);

    Http.PostAPI(process.env.REACT_APP_ADDCATEGORYSECTION, formdata, null)
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
          setSectionName("");
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
    //  setSectionName("");
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group controlId="name-1">
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
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
            <Form.ControlLabel
              style={{
                color: "#808080",
                fontSize: "0.9rem",
                marginTop: "1em",
                PaddingTop: "20px",
              }}
            >
              Add Image
            </Form.ControlLabel>
            <Form.Group>
              <input
                type="file"
                name="imageUrl"
                required
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
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
