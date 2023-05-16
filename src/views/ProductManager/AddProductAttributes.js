import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { addAttributeValidationModel } from "components/Validation";

const AddProductAttributes = ({
  attribute,
  setAttribute,
  getColor,
  setGetColor,
  getSize,
  setGetSize,
  inStocks,
  setInStocks,
}) => {
  const [AddAttribute, setAddAttribute] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [inStock, setInStock] = useState("");

  const [formValue, setFormValue] = useState([
    {
      price: "",
      discountPrice: "",
      sku: "",
      qty: "",
      gst: "",
    },
  ]);

  const formRef = React.useRef();

  const notificationAlertRef = React.useRef(null);

  const handleAttributeChange = (index, name, value) => {
    const updatedAttributes = [...formValue];
    updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
    setFormValue(updatedAttributes);
  };
  const addAttributeField = () => {
    setFormValue((prevFormValue) => [
      ...prevFormValue,
      {
        qty: "",
        gst: "",
        color: "",
        size: "",
        price: "",
        discountPrice: "",
        in_stock: "",
        sku: "",
      },
    ]);
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

    setAttribute(formValue);
    setGetColor(color);
    setGetSize(size);
    setInStocks(inStock);
    console.log("Attribute", attribute);
    setIsFormSubmitted(true);
    setFormValue({
      price: "",
      discountPrice: "",
      sku: "",
      qty: "",
      gst: "",
    });
    setColor("");
    setSize("");
    setInStock("");
  };

  // const handleChange = (value) => {
  //   setFormValue(value);
  // };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Form
        fluid
        ref={formRef}
        // formValue={formValue}
        onSubmit={handleSubmitForm}
        model={addAttributeValidationModel}
        // onChange={handleAttributeChange}
        className="UpdateProductForm"
      >
        {formValue.map((formValues, index) => (
        <div key={index}>
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
                onChange={(e) => {
                  setColor(e.target.value);
                }}
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
                onChange={(e) => {
                  setSize(e.target.value);
                }}
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
              value={formValues.price}
             onChange={(value) => handleAttributeChange(index,value, "price")}
            
            ></Form.Control>
          </Form.Group>
          {console.log("price",formValues.price)}

          <Form.Group>
            <Form.ControlLabel className="formLabelText">
              Discounted Price
            </Form.ControlLabel>
            <Form.Control
              style={{ width: "177px" }}
              name="discountPrice"
              type="text"
              value={formValue.discountPrice}
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
              style={{ width: "155px", marginBottom: "-15px" }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel className="formLabelText">QTY</Form.ControlLabel>
            <Form.Control
              type="text"
              name="qty"
              value={formValue.qty}
              style={{ width: "155px", marginBottom: "-15px" }}
            ></Form.Control>
          </Form.Group>
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
          <Form.Control name="sku" type="text" value={formValues.sku}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="formLabelText">Stock</Form.ControlLabel>
          <div style={{ width: "50%", marginTop: "5px", marginBottom: "15px" }}>
            <select
              name="selectSection"
              value={inStock}
              onChange={(event) => setInStock(event.target.value)}
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
       
        </div>
         ))}
        <div className="updateModelButton">
          <ButtonComponent
            onClick={addAttributeField}
            buttontext="ADD ATTRIBUTE"
          />
        </div>
      </Form>
    </>
  );
};
export default AddProductAttributes;
