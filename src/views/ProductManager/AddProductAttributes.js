import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { addAttributeValidationModel } from "components/Validation";

const AddProductAttributes = ({ attribute, setAttribute }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);

  const [formValue, setFormValue] = useState({
    price: "",
    discountPrice: "",
    sku: "",
    qty: "",
    gst: "",
    color: "",
    size: "",
    inStock: "",
  });

  const formRef = React.useRef();

  const notificationAlertRef = React.useRef(null);

  const handleAttributeChange = (name, value) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    function getSize() {
      Http.GetAPI(process.env.REACT_APP_GETSIZE, "")
        .then((res) => {
          if (res?.data?.status) {
            setSizeData(res?.data?.data);
          } else {
            alert("Fields not matched");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
        });
    }

    getSize();
  }, []);

  useEffect(() => {
    function getColor() {
      Http.GetAPI(process.env.REACT_APP_GETCOLOR, "")
        .then((res) => {
          if (res?.data?.status) {
            setColorData(res?.data?.data);
          } else {
            alert("Fields not matched");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
        });
    }

    getColor();
  }, []);

  const handleSubmitForm = () => {
    console.log("form....", formValue);

    const newAttribute = {
      price: formValue.price,
      discountPrice: formValue.discountPrice,
      sku: formValue.sku,
      qty: formValue.qty,
      gst: formValue.gst,
      color: formValue.color,
      size: formValue.size,
      inStock: formValue.inStock,
    };

    setAttribute((prevAttributes) => [...prevAttributes, newAttribute]);
    console.log("Attribute", attribute);
    setIsFormSubmitted(true);
    setFormValue({
      price: "",
      discountPrice: "",
      sku: "",
      qty: "",
      gst: "",
      color: "",
      size: "",
      inStock: "",
    });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
<div>
      <Form
        fluid
        ref={formRef}
        onSubmit={handleSubmitForm}
        model={addAttributeValidationModel}
        className="UpdateProductForm"
      >
        <Form.ControlLabel className="add-label-UpdateProduct">
          {" "}
          Add Attribute
        </Form.ControlLabel>

        <div style={{ display: "flex" }}>
          <Form.Group style={{ width: "100%" }}>
            <Form.ControlLabel
              className="formLabelText"
              style={{
                width: "100%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Color
            </Form.ControlLabel>
            <div
              style={{
                width: "100%",
                margin: "auto",
                marginTop: "5px",
                marginBottom: "5px",
                paddingRight: "10px",
              }}
            >
              <select
                required
                name="color"
                value={formValue.color}
                onChange={(e) => handleAttributeChange("color", e.target.value)}
                style={{
                  height: "35px",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderColor: "#808020",
                  width: "100%",
                }}
              >
                <option value="">Select</option>
                {colorData?.map((ele) => (
                  <option
                    style={{
                      fontSize: "14px",
                      paddingBottom: "10px",
                      paddintTop: "10px",
                    }}
                    value={ele.id}
                  >
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
          <Form.Group style={{ width: "100%" }}>
            <Form.ControlLabel
              className="formLabelText"
              style={{
                width: "100%",
                marginTop: "5px",
                marginBottom: "5px",
                paddingLeft: "10px",
              }}
            >
              Size
            </Form.ControlLabel>
            <div
              style={{
                width: "100%",
                margin: "auto",
                marginTop: "5px",
                marginBottom: "5px",
                paddingLeft: "10px",
              }}
            >
              <select
                required
                name="size"
                value={formValue.size}
                onChange={(e) => handleAttributeChange("size", e.target.value)}
                style={{
                  height: "35px",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  borderColor: "#808020",
                  width: "100%",
                }}
              >
                {" "}
                {console.log("Sizes", formValue.size)}
                <option value="">Select</option>
                {sizeData?.map((ele) => (
                  <option
                    style={{
                      fontSize: "14px",
                      paddingBottom: "10px",
                      paddintTop: "10px",
                    }}
                    value={ele.id}
                  >
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
        </div>

        <Form.Group
          layout="inline"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Form.Group>
            <Form.ControlLabel className="formLabelText">
              Price
            </Form.ControlLabel>
            <Form.Control
              style={{ width: "177px" }}
              name="price"
              type="text"
              value={formValue.price}
              onChange={(value) => handleAttributeChange("price", value)}
            ></Form.Control>
          </Form.Group>
          {console.log("price", formValue.price)}

          <Form.Group>
            <Form.ControlLabel className="formLabelText">
              Discounted Price
            </Form.ControlLabel>
            <Form.Control
              style={{ width: "177px" }}
              name="discountPrice"
              type="text"
              value={formValue.discountPrice}
              onChange={(value) =>
                handleAttributeChange("discountPrice", value)
              }
            ></Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group
          layout="inline"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Form.Group>
            <Form.ControlLabel className="formLabelText">
              {" "}
              GST
            </Form.ControlLabel>
            <Form.Control
              type="text"
              name="gst"
              value={formValue.gst}
              onChange={(value) => handleAttributeChange("gst", value)}
              style={{ width: "177px" }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel className="formLabelText">QTY</Form.ControlLabel>
            <Form.Control
              type="text"
              name="qty"
              value={formValue.qty}
              onChange={(value) => handleAttributeChange("qty", value)}
              style={{ width: "177px"  }}
            ></Form.Control>
          </Form.Group>
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
          <Form.Control
            name="sku"
            type="text"
            value={formValue.sku}
            onChange={(value) => handleAttributeChange("sku", value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="formLabelText">Stock</Form.ControlLabel>
          <div
            style={{
              width: "50%",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            <select
              name="selectSection"
              value={formValue.inStock}
              onChange={(e) => handleAttributeChange("inStock", e.target.value)}
              style={{
                height: "35px",
                borderRadius: "5px",
                paddingLeft: "5px",
                paddingRight: "5px",
                borderColor: "#808020",
                width: "23rem",
              }}
            >
              <option value="">Select</option>
              <option
                style={{
                  fontSize: "14px",
                  paddingBottom: "10px",
                  paddintTop: "10px",
                }}
              >
                <li>Yes</li>
              </option>
              <option
                style={{
                  fontSize: "14px",
                  paddingBottom: "10px",
                  paddintTop: "10px",
                }}
              >
                <li>No</li>
              </option>
            </select>
          </div>
        </Form.Group>

        <div className="updateModelButton">
          <ButtonComponent buttontext="ADD ATTRIBUTE" />
        </div>
      </Form>
      </div>
    </>
  );
};
export default AddProductAttributes;
