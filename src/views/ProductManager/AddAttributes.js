import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent"
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp"
import { addAttributeValidationModel } from "components/Validation";

const AddAttributes = ({
  setShowUpdateModal,
  showUpdateModal,
  getProducts,
  item,

}) => {
  const [AddAttribute, setAddAttribute] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [inStock, setInStock] = useState("No");
  const [btnLoading, setBtnloading] =useState (false);

  const [formValue, setFormValue] = useState({
    price: "",
    discountPrice: "",
    sku: "",
    inStock:"",
  });
  console.log("AAAAAttinstock",  item?.id)

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
            console.log("ccc",res.data.data);
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
      data.append("instock", inStock);
      data.append("product_id", item?.id);
      setBtnloading(true);

      Http.PostAPI(process.env.REACT_APP_ADDATRIBUTE, data, null)
        .then((res) => {
          setBtnloading(false);
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
          setBtnloading(false);
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });
    }
    setShowUpdateModal(false);
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
        // onReset={handleReset}
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
        {/* <Form.Group
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
                style={{ width: "155px", marginBottom: "-15px" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel className="formLabelText">
                QTY
              </Form.ControlLabel>
              <Form.Control
                // onChange={(e) => {
                //   handleInput(e);
                // }}

                type="text"
                style={{ width: "155px", marginBottom: "-15px" }}
              ></Form.Control>
            </Form.Group>
          </Form.Group> */}
        {/* </div> */}
        {/* </Form.Group> */}
        <Form.Group>
              <Form.ControlLabel className="formLabelText">Stock</Form.ControlLabel>
              <div
                style={{ width: "50%", marginTop: "5px", marginBottom: "15px" }}
              >
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

        <Form.Group fluid>
          <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
          <Form.Control
            value={formValue.sku}
            name="sku"
            type="text"
          ></Form.Control>
        </Form.Group>

          <ButtonComponent 
          buttontext="ADD ATTRIBUTE"
          btnLoading={btnLoading}
          />


        {/* <Form.Group>
                <Form.ControlLabel className="add-label">Update Attributes</Form.ControlLabel>
                {item?.attributes?.map((ele, index) => (
                  <UpdateAttributes
                    ele={ele}
                    index={index}
                    getProducts={getProducts}
                  />
                ))}
              </Form.Group>

               <div>
                <Size
                  setAttributes={setAttributes}
                  attributes={attributes}
                  isAddProdcut={false}
                  len={item.attributes.length}
                  id={item.id}
                />
              </div>  
              </div   */}
      </Form>
    </>
  );
};
export default AddAttributes;
