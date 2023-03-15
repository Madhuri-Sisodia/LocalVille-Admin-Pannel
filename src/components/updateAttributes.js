import UpdateProduct from "./updateProduct";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../config/Service";
import { apis } from "../config/WebConstant";
import "../assets/css/day.css";
import {ColorSize} from "../CommonUtils/ColorSize"
import ButtonComponent from "views/ButtonComponent";

const UpdateAttributes = ({getProducts, setAttributes, attributes,updateAttributes,ele,index }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [product, setProduct] = useState([]);
  const [ingridents, setingridents] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [getSelectedSize, setGetSelectedSize] = useState("");
  const [getSelectedColor, setGetSelectedColor] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [NewPrice, setNewPrice] = useState("");
  const [sku, setSku] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [getAttributes, setGetAttributes] = useState({
    Size: "",
    Color: "",
    Price: "",
    dis_Price: "",
    attr_id:"",
    sku:"",
  });

  console.log("getAttribute", getAttributes);

  const increaseIngridents = () => {
    setingridents([...ingridents, getAttributes]);
    setShowAddProduct(true);
  };

  console.log(ele)

  useEffect(() => {
    function ColorSize() {
      Http.GetAPI(apis.getSize, "")
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

    ColorSize();
  }, []);

  
  useEffect(() => {
    function ColorSize() {
      Http.GetAPI(apis.getColor, "")
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

    ColorSize();
  }, []);

  const Submit = (event) => {
    event.preventDefault();

    sizeData.filter((ele) => {
        if (ele.name == getSelectedSize) {
          console.log(ele.name);
          setGetAttributes((previous) => {
            return { ...previous, Size: ele };
          });
        }
      });
  
      setGetAttributes((previous) => {
        return { ...previous, Price: NewPrice };
      });
  
      setGetAttributes((previous) => {
        return { ...previous, dis_Price: discountPrice };
      });
  
      colorData.filter((ele) => {
        if (ele.name == getSelectedColor) {
          setGetAttributes((previous) => {
            return { ...previous, Color: ele };
          });
        }
      });
  
      setGetAttributes((previous) => {
          return { ...previous, sku: discountPrice };
        });
  
    setIsAdded(true);
    setShowAddProduct(false);
  };

  useEffect(()=>{
    if(isAdded)
      {
        
            const data = new FormData()
            data.append(`color[${index}]`,(getAttributes.Color.id)?(getAttributes.Color.id) :ele?.color[0]?.id)
            data.append(`size[${index}]`,(getAttributes.Size.id)?(getAttributes.Size.id) :ele?.size[0]?.id)
            data.append(`price[${index}]`,(getAttributes.Price)?(getAttributes.Price):ele?.price)
            data.append(`dis_price[${index}]`,(getAttributes.dis_Price)?(getAttributes.dis_Price):ele?.discount_price)
            data.append(`sku[${index}]`,(getAttributes.sku)?(getAttributes.sku):ele.sku)
            data.append(`product_id`,ele.pid)
            data.append(`attr_id`,ele.id)

          Http.PostAPI(process.env.REACT_APP_UPDATEATTRIBUTE, data, null)
          .then((res) => {
            console.log("resp", res);
            if (res?.data?.status) {
              console.log("hello")
              setProduct(res?.data?.data);
              getProducts();
            } else {
              alert("Fields not matched");
            }
          })
          .catch((e) => {
            //alert("Something went wrong.");
            // console.log("Error:", e);
          });

      }
  },[isAdded])


  return (
   <>
   <div>
   
   </div>
    <Modal
      show={showAddProduct}
      onHide={() => setShowAddProduct(false)}
    >
      <Modal.Header>
        <Modal.Title className="title">Add Attributes</Modal.Title>
        <MdClose
          className="close-icon"
          onClick={() => {
            setShowAddProduct(false);
          }}
        />
      </Modal.Header>
      <Modal.Body className="add-body">
        <Form>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Group style={{ width: "50%" }}>
              <Form.Label
                className="add-label"
                style={{
                  width: "100%",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                Color
              </Form.Label>
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
                  name="selectSection"
                  value={getSelectedColor}
                  onChange={(event) =>
                    setGetSelectedColor(event.target.value)
                  }
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
            <Form.Group style={{ width: "50%" }}>
              <Form.Label
                className="add-label"
                style={{
                  width: "100%",
                  marginTop: "5px",
                  marginBottom: "5px",
                  paddingLeft: "10px",
                }}
              >
                Size
              </Form.Label>
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
                  name="selectSection"
                  value={getSelectedSize}
                  onChange={(event) =>
                    setGetSelectedSize(event.target.value)
                  }
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
                    >
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label className="add-label">Price</Form.Label>
            <Form.Control
              required
              type="text"
              name="price"
              defaultValue={ele.price}
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="add-label">
              Discounted Price
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="dis_price"
              defaultValue={ele.discount_price}
              onChange={(e) => {
                setDiscountPrice(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="add-label">
              Sku
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="dis_price"
              defaultValue={ele.sku}
              onChange={(e) => {
                setSku(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <button
            type="submit"
            style={{
              backgroundColor: "blueviolet",
              border: "blueviolet",
              borderRadius: "3px 3px 3px 3px",
              width: "100%",
              padding: "5px",
              color: "white",
              marginTop: "20px",
            }}
            onClick={Submit}
          >
            Add
          </button>
        </Form>
      </Modal.Body>
    </Modal>
    <div style={{ margin: "0px" }}>
             <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid gray ",
                }}
              >
                <p style={{ margin: "7px" }}>
                  Size : {ele?.size[0]?.name}
                </p>
                <p style={{ margin: "7px" }}>
                  Color : {ele?.color[0]?.name}
                </p>
                <p style={{ margin: "7px" }}>
                  Price : {ele?.price}
                </p>
                <p style={{ margin: "7px" }}>
                  Dis_Price : {ele?.discount_price}
                </p>
                <Button
        className="btn-simple btn-link p-1"
        type="button"
        variant="success"
        onClick={(e)=>{setShowAddProduct(true)}}
      >
        <i className="fa fa-edit"></i>
      </Button>
           </div>
    </div>
   </>

  )
};

export default UpdateAttributes;
