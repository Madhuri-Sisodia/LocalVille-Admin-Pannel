import React, { useState } from "react";
import "../assets/css/admin.css";
import { Form, Radio, RadioGroup, Button, ButtonToolbar } from "rsuite";

function Category() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [containSizes, setContainSizes] = useState("");
  const [containColors, setContainColors] = useState("");
  const [subCategories, setSubCategories] = useState("");

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
  };

  return (
    <div className="AddAdminMainContainer">
      <div className="AdminContainer">
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
                required="containSizes"
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
                required="containColors"
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
                required="subCategories"
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
  );
}

export default Category;
