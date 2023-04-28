import React, { useState, useEffect, useRef } from "react";

import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import editButton from "../../assets/img/editButton.png";
import { validationUpdateModel } from "components/Validation";
import AddAttributes from "./AddAttributes";
import DeleteAttribute from "./DeleteAttribute";

const UpdateAttribute = ({
  item,
  getProducts,
  setShowUpdateModal,
  showUpdateModal,
}) => {
  console.log("itemmm", item?.attributes[0]);

  const [updateProduct, setUpdateProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [formValue, setFormValue] = useState({
    
    price: "",
    discountPrice: "",
    attributeId: "",
    sku: "",
    inStock: "",
    productId: "",
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

    getColor();
  }, []);

  const handleSubmit = (event) => {
    // event.preventDefault();

    var data = new FormData();

    data.append(
      "size",
      size ? size : item?.attributes?.[0]?.size?.[0]?.name
    );
    console.log();
    data.append(
      "color",
      color
        ? color
        : item?.attributes?.[0]?.color?.[0]?.name
    );
    data.append(
      "price",
      formValue.price ? formValue.price : item?.attributes?.[0]?.price
    );
    data.append(
      "dis_price",
      formValue.discountPrice
        ? formValue.discountPrice
        : item?.attributes?.[0]?.discount_price
    );

    data.append(
      "attr_id",
      formValue.attributeId ? formValue.attributeId : item?.attributes?.[0]?.id
    );
    data.append(
      "sku",
      formValue.sku ? formValue.sku : item?.attributes?.[0]?.sku
    );
    data.append(
      "instock",
      formValue.inStock ? formValue.inStock : item?.attributes?.[0]?.in_stock
    );
    data.append(
      "product_id",
      formValue.attributeId ? formValue.attributeId : item?.attributes?.[0]?.pid
    );

    Http.PostAPI(process.env.REACT_APP_UPDATEATTRIBUTE, data, null)
      .then((res) => {
        console.log("response....", res);
        if (res?.data?.status) {
          setUpdateProduct(res?.data?.data);
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
      setShowUpdateModal(false);
      
  };

  // const handleReset = () => {
  //   formRef.current.reset();
  // };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Form
        fluid
        ref={formRef}
        formValue={formValue?.defaultValue}
        onSubmit={handleSubmit}
       
        onChange={setFormValue}
        className="UpdateProductForm"
      >
        <Form.Group>
          <Row>
            {item?.attributes?.map((attribute, index) => (
              <Col className="cardModel" md={6} sm={12} key={index}>
                <div className="leftSectionCard">
                  <h6>{attribute?.sku}</h6>
                  <h5>
                    {attribute?.size?.[0]?.name}, {attribute?.color?.[0]?.name}
                  </h5>
                  <div className="CardPriceArea">
                    <p className="priceBefore"> ₹ {attribute?.price}</p> <b></b>
                    <h6 className="priceAfter">
                      {" "}
                      ₹ {attribute?.discount_price}
                    </h6>{" "}
                  </div>
                </div>
                <div className="RightSectionCard">
                  <button
                    className="btn btn-primary editButton"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <img src={editButton} className="editbutton" />
                  </button>
                  <i
                    className="fa fa-trash"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  ></i>
                </div>
              </Col>
            ))}
          </Row>
        </Form.Group>

        <div className="collapseAttribute" id="collapseExample">
          <Form.Group
            layout="inline"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
                width: "10rem",
                margin: "auto",
                marginTop: "5px",
                marginBottom: "5px",
                paddingRight: "10px",
              }}
            >
              <select
                required
                value={color}
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
                width: "10rem",
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
                value={size}
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
                <option  defaultValue={
                  color
                    ? color
                    : item?.attributes?.[0]?.size?.[0]?.name}>Select</option>
                {sizeData?.map((ele) => (
                  <option
                  style={{
                    fontSize: "14px",
                    paddingBottom: "10px",
                    paddintTop: "10px",
                  }}
                  >
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
          </div>
            {/* <Form.Group>
              <Form.ControlLabel className="formLabelText">
                Size
              </Form.ControlLabel>
              <Form.Control
                type="text"
                name="size"
                defaultValue={
                  formValue.size
                    ? formValue.size
                    : item?.attributes?.[0]?.size?.[0]?.name
                }
                style={{
                  width: "155px",
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel className="formLabelText">
                Color
              </Form.ControlLabel>
              <Form.Control
               
                name="color"
                defaultValue={
                  formValue.color
                    ? formValue.color
                    : item?.attributes?.[0]?.color?.[0]?.name
                }
                type="text"
                style={{
                  width: "155px",
                  marginBottom: "-10px",
                }}
              ></Form.Control>
            </Form.Group> */}
          </Form.Group>
          <Form.Group
            layout="inline"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Group>
              <Form.ControlLabel className="formLabelText">
                Price
              </Form.ControlLabel>
              <Form.Control
               style={{
                width: "156px",
            
              }}
                name="price"
                type="text"
                defaultValue={
                  formValue.price
                    ? formValue.price
                    : item?.attributes?.[0]?.price
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel className="formLabelText">
                Discounted Price
              </Form.ControlLabel>
              <Form.Control
               style={{
                width: "156px",
               
              }}
                defaultValue={
                  formValue.discountPrice
                    ? formValue.discountPrice
                    : item?.attributes?.[0]?.discount_price
                }
                name="discountPrice"
            

                type="text"
                
              ></Form.Control>
              {console.log("AAAAAA", item?.attributes?.[0]?.discount_price)}
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

          <Form.Group fluid>
            <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
            <Form.Control
              defaultValue={
                formValue.sku ? formValue.sku : item?.attributes?.[0]?.sku
              }
              name="sku"
              // onChange={(e) => {
              //   handleInput(e);
              // }}

              type="text"
             
            ></Form.Control>
          </Form.Group>
          <div className="updateModelButton">
            <ButtonComponent buttontext="UPDATE ATTRIBUTE" />
          </div>
        </div>
      </Form>
      <DeleteAttribute
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
        getProducts={getProducts}
      />
    </>
  );
};
export default UpdateAttribute;
