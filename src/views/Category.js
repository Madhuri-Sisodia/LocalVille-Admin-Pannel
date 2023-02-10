import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../assets/css/admin.css";
import { Form, Radio, RadioGroup, Button, ButtonToolbar } from "rsuite";

const Category = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [containSizes, setContainSizes] = useState("");
  const [containColors, setContainColors] = useState("");
  const [subCategories, setSubCategories] = useState("");

  const notificationAlertRef = React.useRef(null);

  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Categories Successfully Added..!!</b>
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  const handleSubmit = () => {
    // console.log("name", name);
    // console.log("c", category);
    // console.log("co", containSizes);
    // console.log("con", containColors);
    // console.log("sub", subCategories);

    setName("");
    setCategory("");
    setContainColors("");
    setContainSizes("");
    setSubCategories("");

    notify("tr");
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
                Category name
              </Form.ControlLabel>
              <Form.Control
                placeholder="Category Name"
                name="name"
                value={name}
                required="name"
                onChange={(value) => setName(value)}
              />
            </Form.Group>
            <Form.Group controlId="name-1">
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                Category
              </Form.ControlLabel>
              <Form.Control
                placeholder="Category"
                name="category"
                value={category}
                required="category"
                onChange={(value) => setCategory(value)}
              />
            </Form.Group>

            <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
              Contain Sizes
            </Form.ControlLabel>

            <div className="InnnerContainer">
              <Form.Group controlId="radioList">
                <RadioGroup
                  name="containSizes"
                  value={containSizes}
                  onChange={(value) => setContainSizes(value)}
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </RadioGroup>
              </Form.Group>
            </div>
            <br />

            <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
              Contain Colors
            </Form.ControlLabel>
            <div className="InnnerContainer">
              <Form.Group controlId="radioList">
                <RadioGroup
                  name="containColors"
                  value={containColors}
                  onChange={(value) => setContainColors(value)}
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </RadioGroup>
              </Form.Group>
            </div>
            <br />
            <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
              sub-Categories
            </Form.ControlLabel>
            <div className="InnnerContainer">
              <Form.Group controlId="radioList">
                <RadioGroup
                  name="subCategories"
                  value={subCategories}
                  onChange={(value) => setSubCategories(value)}
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </RadioGroup>
              </Form.Group>
            </div>
            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{ marginTop: "3rem", marginBottom: "0.5rem" }}
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

export default Category;
