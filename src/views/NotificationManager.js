import React, { useState } from "react";
import { Form, Button, ButtonToolbar, SelectPicker, Checkbox } from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../assets/css/admin.css";

const NotificationManager = () => {
  const vendors = [
    { label: "Vendor 1", value: "vendor1" },
    { label: "Vendor 2", value: "vendor2" },
    { label: "Vendor 3", value: "vendor3" },
    { label: "Vendor 4", value: "vendor4" },
  ];

  const [selectedVendors, setSelectedVendors] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
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
              <SelectPicker
                data={vendors}
                name="vendors"
                placeholder="Select vendors"
                style={{ width: 300 }}
                value={selectedVendors}
                onChange={(value) => setSelectedVendors(value)}
                searchable={false}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>IMAGE</Form.ControlLabel>
              <Form.Control
                name="image"
                type="file"
                accept="image/*"
                onChange={(value) => setImage(value)}
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
            <button
              type="submit"
              block
              style={{
                backgroundColor: "blueviolet",
                border: "blueviolet",
                borderRadius: "3px 3px 3px 3px",
                width: "100%",
                padding: "10px",
                color: "white",
                marginTop: "20px",
                fontSize: "0.9rem",
              }}
            >
              Submit
            </button>
          
          </Form>
        </div>
      </div>
    </>
  );
};

export default NotificationManager;
