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
  setShowAddProduct,
  showAddProduct,
  getProducts,
  item,
}) => {
  const [AddAttribute, setAddAttribute] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  console.log("III",item?.[0]?.attributes?.[0]?.in_stock);

  const [formValue, setFormValue] = useState({
    price: "",
    discountPrice: "",
    sku: "",
    qty: "",
    gst: "",
  });

  const formRef = React.useRef();

  const notificationAlertRef = React.useRef(null);

  useEffect(() => {
    function getSize() {
      Http.GetAPI(process.env.REACT_APP_GETSIZE, "")
        .then((res) => {
          if (res?.data?.status) {
            setSizeData(res?.data?.data);
            console.log(res.data.data);
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
            console.log("ccc", res.data.data);
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

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log("sss");
    if (!formRef.current.check()) {
      console.log("FORM ERROR!");

      return;
    } else {
      console.log("form....", formValue);

      var data = new FormData();

      data.append("size", size);
      data.append("color", color);
      data.append("price", formValue.price);
      data.append("dis_price", formValue.discountPrice);
      data.append("sku", formValue.sku);
      data.append("qty", formValue.qty);
      data.append("gst", formValue.gst);
      data.append("instock", item?.[0]?.attributes?.[0]?.in_stock);
      data.append("product_id", item?.[0]?.attributes?.[0]?.pid);

      Http.PostAPI(process.env.REACT_APP_ADDATRIBUTE, data, null)
        .then((res) => {
          console.log("response....", res);
          if (res?.data?.status) {
            setAddAttribute(res?.data?.data);
            getProducts();
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
    }
    setShowAddProduct(false);
  };

  //   const handleReset = () => {
  //     formRef.current.reset();
  //   };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Form
        fluid
        ref={formRef}
        formValue={formValue}
        onSubmit={handleSubmit}
        model={addAttributeValidationModel}
        onChange={setFormValue}
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
              value={formValue.price}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel className="formLabelText">
              Discounted Price
            </Form.ControlLabel>
            <Form.Control
              style={{ width: "177px" }}
              value={formValue.discountPrice}
              name="discountPrice"
              type="text"
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
              value={formValue.qty}
              type="text"
              name="qty"
              style={{ width: "155px", marginBottom: "-15px" }}
            ></Form.Control>
          </Form.Group>
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
          <Form.Control
            value={formValue.sku}
            name="sku"
            type="text"
          ></Form.Control>
        </Form.Group>

          <ButtonComponent buttontext="ADD ATTRIBUTE" />
      </Form>
    </>
  );
};
export default AddProductAttributes;
