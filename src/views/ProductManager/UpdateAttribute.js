import React, { useState, useEffect, useRef } from "react";

import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const UpdateAttribute = ({ item, getProducts, setShowUpdateModal, index }) => {


  const [updateProduct, setUpdateProduct] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [btnLoading, setBtnloading] =useState (false);

  const [formValue, setFormValue] = useState({
    price: "",
    discountPrice: "",
    attributeId: "",
    sku: "",
    inStock: "",
    productId: "",
    gst: "",
    qty: "",
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
      size ? size : item?.attributes?.[index]?.size?.[index]?.name
    );
    console.log();
    data.append(
      "color",
      color ? color : item?.attributes?.[index]?.color?.[index]?.name
    );
    data.append(
      "price",
      formValue.price ? formValue.price : item?.attributes?.[index]?.price
    );
    data.append(
      "dis_price",
      formValue.discountPrice
        ? formValue.discountPrice
        : item?.attributes?.[index]?.discount_price
    );

    data.append(
      "attr_id",
      formValue.attributeId
        ? formValue.attributeId
        : item?.attributes?.[index]?.id
    );
    data.append(
      "sku",
      formValue.sku ? formValue.sku : item?.attributes?.[index]?.sku
    );
    data.append(
      "instock",
      formValue.inStock
        ? formValue.inStock
        : item?.attributes?.[index]?.in_stock
    );
    data.append(
      "product_id",
      formValue.attributeId
        ? formValue.attributeId
        : item?.attributes?.[index]?.pid
    );
    data.append(
      "qty",
      formValue.qty ? formValue.qty : item?.attributes?.[index]?.qty
    );
    data.append(
      "gst",
      formValue.gst ? formValue.gst : item?.attributes?.[index]?.gst
    );
    setBtnloading(true);

    Http.PostAPI(process.env.REACT_APP_UPDATEATTRIBUTE, data, null)
      .then((res) => {
        setBtnloading(false);
        if (res?.data?.status) {
          setUpdateProduct(res?.data?.data);
          getProducts();
          resetForm();
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
    setShowUpdateModal(false);
  };

  const resetForm = () => {
    setFormValue({
      price: "",
      discountPrice: "",
      attributeId: "",
      sku: "",
      inStock: "",
      productId: "",
      qty: "",
      gst: "",
    });
    setColor("");
    setSize("");
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
      >
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
                  width: "177px",
                }}
                name="price"
                type="text"
                defaultValue={
                  formValue.price
                    ? formValue.price
                    : item?.attributes?.[index]?.price
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel className="formLabelText">
                Discounted Price
              </Form.ControlLabel>
              <Form.Control
                style={{
                  width: "177px",
                }}
                defaultValue={
                  formValue.discountPrice
                    ? formValue.discountPrice
                    : item?.attributes?.[index]?.discount_price
                }
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
                defaultValue={
                  formValue.gst ? formValue.gst : item?.attributes?.[index]?.gst
                }
                style={{ width: "177px", marginBottom: "-15px" }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel className="formLabelText">
                QTY
              </Form.ControlLabel>
              <Form.Control
                defaultValue={
                  formValue.qty ? formValue.qty : item?.attributes?.[index]?.qty
                }
                type="text"
                style={{ width: "177px", marginBottom: "-15px" }}
              ></Form.Control>
            </Form.Group>
          </Form.Group>
          {/* </div> */}
          {/* </Form.Group> */}

          <Form.Group fluid>
            <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
            <Form.Control
              defaultValue={
                formValue.sku ? formValue.sku : item?.attributes?.[index]?.sku
              }
              name="sku"
              type="text"
            ></Form.Control>
          </Form.Group>
            <ButtonComponent 
            buttontext="UPDATE ATTRIBUTE"
            btnLoading={btnLoading} 
            />
        </div>
      </Form>
    </>
  );
};
export default UpdateAttribute;
