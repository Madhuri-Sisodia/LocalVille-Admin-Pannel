import { useState, useEffect } from "react";
import React from "react";
import { Form } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../../assets/css/admin.css";
import MultipleSelect from "components/MultipleSelect";
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
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [addemail, setAddemail] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const notificationAlertRef = React.useRef(null);

  const getVendors = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(),
      ""
      // data,
      // null
    )
      .then((res) => {
        if (res?.data?.status) {
          setEmailData(res?.data?.data);
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
    // e.preventDefault();

    var data = new FormData();
    for (let i = 0; i < emailData.length; i++) {
      for (let j = 0; j < selectedVendors.length; j++) {
        if (emailData[i].email == selectedVendors[j].value) {
          data.append("vendors[]", emailData[i].id);
        }
      }
    }

    // data.append("vendors_field", selectedVendors && selectedVendors?.vendors);
    data.append("title", title);
    data.append("subject", subject);
    data.append("message", message);

    Http.PostAPI(process.env.REACT_APP_POSTEMAIL, data)
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.status) {
          setAddemail(res?.data?.data);
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
    setSelectedVendors("");
    setTitle("");
    setSubject("");
    setMessage("");
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
                data={emailData}
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
              <Form.ControlLabel>SUBJECT</Form.ControlLabel>
              <Form.Control
                placeholder="Subject"
                name="subject"
                value={subject}
                onChange={(value) => setSubject(value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>MESSAGE</Form.ControlLabel>
              <MyComponent setMessage={setMessage} message={message} />
            </Form.Group>
            <ButtonComponent buttontext="Submit" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmailManager;
