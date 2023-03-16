import React, { useState, useEffect } from "react";
import { Form, Button, ButtonToolbar, SelectPicker, Checkbox } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../assets/css/admin.css";
import NotificationAlert from "react-notification-alert";
import { Http } from "config/Service";
import { apis } from "config/WebConstant";
import ButtonComponent from "./ButtonComponent";
import MultipleSelect from "components/MultipleSelect";

const NotificationManager = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [addNotification, setAddNotification] = useState([]);
  const [vendorData, setVendorData] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Notification Successfully Sent..!!</b>
          </div>
        </div>
      ),
      type: "success",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };


  const getVendors = () => {
    Http.GetAPI(apis.getVendorsData + "?" + Math.random(), "")
      .then((res) => {
        if (res?.data?.status) {
          setVendorData(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };
  useEffect(() => {
    getVendors();
  }, []);

  


  const handleSubmit = (e) => {
    // e.preventDefault();
    let arr = [];

    // const id = vendorid[0].id;
    console.log("vvv", arr);

    var data = new FormData();
    for (let i = 0; i < vendorData.length; i++) {
      for (let j = 0; j < selectedVendors.length; j++) {
        if (vendorData[i].email == selectedVendors[j].value) {
          data.append("vendors[]", vendorData[i].id);
          console.log("aaa", vendorData[i].id);
        }
      }
    }

    data.append("img", image);
    data.append("title", title);
    data.append("message", message);

    Http.PostAPI(process.env.REACT_APP_ADDNOTICATIONMANAGER, data)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setAddNotification(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
      setSelectedVendors("");
      setImage("");
      setTitle("");
      setMessage("");
      notify("tr");
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
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
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
            <ButtonComponent 
          block 
          buttontext="Submit"
           />
          </Form>
        </div>
      </div>
    </>
  );
};
export default NotificationManager;
