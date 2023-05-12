import UpdateProduct from "./updateProduct";
import React, { useState, useEffect, useCallback } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../config/Service";
import "../assets/css/day.css";
import { ColorSize } from "../CommonUtils/ColorSize"
import ButtonComponent from "views/ButtonComponent";


const Size = ({ setAttributes, attributes, isAddProduct, len, id }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [ingridents, setingridents] = useState([null]);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [getSelectedSize, setGetSelectedSize] = useState("");
  const [getSelectedColor, setGetSelectedColor] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [NewPrice, setNewPrice] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [sku, setSku] = useState("")
  const [attIndex, setAttIndex] = useState(0)
  const [increse, setIncrese] = useState(false)
  const [getAttributes, setGetAttributes] = useState({
    Size: "",
    Color: "",
    Price: "",
    dis_Price: "",
    sku: ""
  });

  const increaseIngridents = (e) => {
    console.log('calling', showAddProduct)
    e.preventDefault()
    // setingridents([...ingridents, ""]);
    setShowAddProduct(true);
  };

  console.log(isAddProduct, attributes)


  const deleteIngredent = (e) => {
    const Result = [...ingridents];
    Result.splice(e.target.id, 1);
    setingridents(Result);
    const Att = [...attributes];
    Att.splice(e.target.id, 1);
    setAttributes(Att);
  };

  useEffect(() => {
    function ColorSize() {
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

    ColorSize();
  }, []);

  useEffect(() => { }, []);

  useEffect(() => {
    function ColorSize() {
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

    ColorSize();
  }, []);

  const SubmitAttribute = (event) => {
    event.preventDefault();
    if (parseInt(NewPrice) < parseInt(discountPrice)) {
      alert("Price must be higher than discount price")
    }
    else {
      var localAttributes = {
        Size: "",
        Color: "",
        Price: "",
        dis_Price: "",
        sku: ""

      };

      sizeData.filter((ele) => {
        if (ele.name == getSelectedSize) {
          console.log(getSelectedSize);
          localAttributes.Size = ele;
          // setGetAttributes((previous) => {
          //   return { ...previous, Size: ele };
          // });
        }
      });

      setGetAttributes((previous) => {
        localAttributes.Price = NewPrice;
        // return { ...previous, Price: NewPrice };
      });

      setGetAttributes((previous) => {
        localAttributes.dis_Price = discountPrice;
        // return { ...previous, dis_Price: discountPrice };
      });

      setGetAttributes((previous) => {
        localAttributes.sku = sku;
        // return { ...previous, sku:sku};
      });

      colorData.filter((ele) => {
        if (ele.name == getSelectedColor) {
          localAttributes.Color = ele;
          // setGetAttributes((previous) => {
          //   return { ...previous, Color: ele };
          // });
        }
      });
      setingridents([...ingridents, localAttributes]);
      console.log('setingridents([...ingridents, ""]);', localAttributes)
      setIsAdded(true);
      setShowAddProduct(false);
    }

  };

  console.log('log once', isAdded)

  useEffect(() => {
    if (isAdded) {
      if (len) {
        console.log("succes", attIndex)
        const data = new FormData()
        const idx = attIndex;

        data.append(`color[${idx}]`, getAttributes?.Color?.id)
        data.append(`size[${idx}]`, getAttributes?.Size?.id)
        data.append(`price[${idx}]`, getAttributes?.Price)
        data.append(`dis_price[${idx}]`, getAttributes?.dis_Price)
        data.append(`sku[${idx}]`, getAttributes?.sku)
        data.append(`product_id`, id)

        Http.PostAPI(process.env.REACT_APP_ADDATRIBUTE, data, null)
          .then((res) => {
           
            if (res?.data?.status) {
              
              setAttributes((previous) => {
                return [...previous, getAttributes];
              })
              setIsAdded(false)
            } else {
              alert("Fields not matched");
            }
          })
          .catch((e) => {
            alert("Something went wrong.");
            console.log("Error:", e);
          });
      }
      else {
        console.log("hello222")
        console.log(getAttributes)
        setAttributes((previous) => {
          return [...previous, getAttributes];
        });
        setIsAdded(false);
      }
    }
  }, [isAdded]);



  return (
    <>
      <div style={{ margin: "0px" }}>
        {ingridents.map((ele, index) => {
          return (
            <>
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
                        required={true}
                        type="text"
                        name="price"
                        onChange={(e) => {
                          setAttIndex((parseInt(index) + parseInt(len)))
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
                      onClick={SubmitAttribute}
                    >
                      Add
                    </button>
                  </Form>
                </Modal.Body>
              </Modal>

              {ingridents?.map((item, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid gray ",
                    }}
                  >
                    {item?.Size && <p style={{ margin: "7px" }}>
                      Size : {item?.Size?.name}
                    </p>}
                    {item?.Color && <p style={{ margin: "7px" }}>
                      Color : {item?.Color?.name}
                    </p>}

                    {item?.Price && <p style={{ margin: "7px" }}>
                      Price : {item?.Price}
                    </p>}

                    {item?.dis_Price && <p style={{ margin: "7px" }}>
                      DiscountPrice : {item?.dis_Price}
                    </p>}

                    {item?.sku && <p style={{ margin: "7px" }}>
                      sku : {item?.sku}
                    </p>}
                    <Button
                      id={index}
                      className="btn-simple btn-link p-1"
                      type="button"
                      variant="danger"
                      onClick={deleteIngredent}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  </div>
                )
              })}
            </>
          );
        })}

        {/* <div align="center">
          <button
            onClick={
              increaseIngridents
            }
            style={{
              width: '100%',
              backgroundColor: '#fff',
              'border': '2px dashed #6D44BC',
              textAlign: 'center',
              borderRadius: 10,
              color: '#6D44BC',
              marginTop: 20
            }}
          >
            Add Attributes
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Size;
