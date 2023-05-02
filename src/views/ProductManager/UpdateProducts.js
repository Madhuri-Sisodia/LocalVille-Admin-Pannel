import React, { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import { FaCamera } from "react-icons/fa";
import "../../assets/css/modal.css";
import Size from "components/size";
import { get } from "jquery";
import ButtonComponent from "views/ButtonComponent";

import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Image from "../../assets/img/dummyproduct.jpeg";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import ViewProductModal from "./ViewProductModal";
import editButton from "../../assets/img/editButton.png";
import { validationUpdateModel } from "components/Validation";
import AddAttributes from "./AddAttributes";
import UpdateAttribute from "./UpdateAttribute";
import DeleteAttribute from "./DeleteAttribute";

const AddProduct = ({
  showUpdateModal,
  setShowUpdateModal,
  setSelectedProducts,
  getProducts,
  item,
}) => {
  console.log(getProducts);

  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(-1);

  // const [image, setImage] = useState(null);
  // const [vendortData, setVendorData] = useState([]);
  // const [selectSection, setSelectSection] = useState("");
  // const [getStoreData, setGetStoreData] = useState([]);
  // const [getProcat, setGetProCat] = useState([]);
  // const [getProSubcat, setGetProSubCat] = useState([]);
  // const [selectProCat, setSelectProCat] = useState("");
  // const [selectProSubCat, setSelectProSubCat] = useState("");
  // const [getsize, setGetSize] = useState([]);
  // const [color, setColor] = useState([]);
  const [productImage, setProductImage] = useState();
  const [baseImage, setBaseImage] = useState("");
  const [buy, setBuy] = useState("No");
  const [pickup, setPickup] = useState("No");

  // const [productPrice, setProductPrice] = useState([]);
  // const [productDiscountPrice, setProductDiscountPrice] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [isAddProdcut, setIsAddProduct] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [UpdateProduct, setUpdateProduct] = useState();
  const [formValue, setFormValue] = useState({
    productId: item?.id,
    productName: item?.product_name,
    productDesc: item?.product_desc,
    buy: item?.is_buy,
    pickup: item?.is_pickup,
    category: item?.category_name,
    sub_category: item?.subcategory_name,
  });

  console.log(item?.id);

  const formRef = React.useRef();
  const isMounted = useRef(false);

  const notificationAlertRef = React.useRef(null);

  const updateImage = () => {
    const data = new FormData();

    data.append(
      "product_id",
      formValue.productId ? formValue.productId : item?.id
    );
    console.log("userrrrr", item?.id);
    data.append(
      "product_name",
      formValue.productName ? formValue.productName : item?.product_name
    );

    data.append("product_image", productImage);

    Http.PostAPI(process.env.REACT_APP_UPDATEPRODUCTIMAGE, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setProduct(res?.data?.data);
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
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBaseImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isMounted.current) {
      updateImage();
    } else {
      isMounted.current = true;
    }
  }, [baseImage]);

  const handleSubmit = (event) => {
    // event.preventDefault();

    var data = new FormData();
    data.append("pid", item.id);
    data.append(
      "product_name",
      formValue.productName ? formValue.productName : item?.product_name
    );
    console.log();
    data.append(
      "product_desc",
      formValue.productDesc ? formValue.productDesc : item?.product_desc
    );
    data.append(
      "category_name",
      formValue.category ? formValue.category : item?.category_name
    );
    data.append(
      "subcategory_name",
      formValue.sub_category ? formValue.sub_category : item?.subcategory_name
    );

    data.append("is_buy", buy ? (buy == "Yes" ? 1 : 0) : item?.is_buy);
    data.append(
      "is_pickup",
      pickup ? (pickup == "Yes" ? 1 : 0) : item?.is_pickup
    );

    // console.log("response....",handleSubmit);

    Http.PostAPI(process.env.REACT_APP_UPDATEPRODUCTS, data, null)
      .then((res) => {
        console.log("response....", res);
        if (res?.data?.status) {
          setProduct(res?.data?.data);
          getProducts();
          setShowUpdateModal(false);
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
        setShowUpdateModal(false);
      });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {item != null && (
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header>
            <Modal.Title className="titleUpdateProduct">
              Update Products
            </Modal.Title>
            <MdClose
              onClick={() => {
                setShowUpdateModal(false);
                setProductImage(null),
                  setFormValue({
                    productName: "",
                    productDesc: "",
                    buy: "",
                    pickup: "",
                    category: "",
                    sub_category: "",
                  });
              }}
            />
          </Modal.Header>
          <Modal.Body className="add-body updateProductModel">
            <Form
              fluid
              ref={formRef}
              formValue={formValue?.defaultValue}
              onSubmit={handleSubmit}
              onChange={setFormValue}
            >
              {/* <div>
                  <img
                    src={
                      productData?.productImage
                        ? productData?.productImage
                        : item.theme_img
                    }
                    alt="image"
                    style={{
                      width: "80px",
                      height: "100px",
                      border: "",
                    }}
                  />
                </div> */}
              <Form.Group className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct">
                  {" "}
                  Update Product Image
                </Form.ControlLabel>

                <div className="uploadProductImage">
                  <div style={{ display: "flex" }}>
                    {item?.images?.map((image, index) => (
                      <div
                        key={index}
                        style={{ display: "inline-block", marginRight: "5px" }}
                      >
                        <img
                          src={productImage ? baseImage : image}
                          alt={`Image ${index}`}
                          style={{
                            width: "50px",
                            height: "60px",
                            borderRadius: "5px",
                          }}
                        />
                        <sup
                          className="deleteButton"
                          style={{ display: "inline-block", marginLeft: "5px" }}
                        >
                          <i className="fa fa-trash"></i>
                        </sup>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div>
                    <img
                      src={productImage ? baseImage : item?.images?.[0]?.images}
                      alt="Image"
                      style={{
                        width: "50px",
                        height: "60px",
                        borderRadius: "5px",
                      }}
                    />
                    {console.log("aaaaaa",item?.images?.[0]?.images)}
                    <sup className="deleteButton">
                      <i className="fa fa-trash"></i>
                    </sup>
                  </div> */}
                <div>
                  <div
                    className="uploadProductImage"
                    style={{ display: "flex", alignItems: "left" }}
                  >
                    <label htmlFor="productImage">
                      <div style={{ position: "relative" }}>
                        <FaCamera
                          style={{
                            fontSize: "4rem",
                            cursor: "pointer",
                            color: "#8052D5",
                            padding: "0.7rem",
                            border: "1px solid blueviolet",
                            borderRadius: "10px",
                          }}
                        />
                        <input
                          id="productImage"
                          multiple
                          type="file"
                          name="productImage"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleImageUpload}
                        />
                      </div>
                    </label>
                    {/* <span
                    style={{
                      margin: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Upload Image
                  </span> */}
                  </div>
                  {/* <div>
                    <img src={Image} className="uploadImage" />
                    <sup className="deleteButton"><i className="fa fa-trash"></i></sup>
                  </div>
                  <div>
                    <img src={Image} className="uploadImage" />
                    <sup className="deleteButton"><i className="fa fa-trash"></i></sup>
                  </div>
                  <div>
                    <img src={Image} className="uploadImage" />
                    <sup className="deleteButton"><i className="fa fa-trash"></i></sup> */}
                  {/* </div> */}

                  {/* <Uploader multiple listType="picture" maxButton={4}>
                    <button>
                      <i className="fa fa-camera"></i>
                    </button>
                  </Uploader> */}
                </div>

                <p className="maxLimit">You can upload maximum 4 images</p>
              </Form.Group>
              {/* <Form.Control
                  name="productImage"
                  multiple
                  onChange={(e) => {
                    setProductData((previous) => {
                      return { ...previous, productImage: e.target.files };
                    });
                  }}
                  type="file"
                ></Form.Control> */}

              <div className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct">
                  {" "}
                  Update Product
                </Form.ControlLabel>

                <div className="UpadateProductFormInner">
                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">
                      Product Name
                    </Form.ControlLabel>
                    <Form.Control
                      name="productName"
                      defaultValue={
                        formValue.productName
                          ? formValue.productName
                          : item?.product_name
                      }
                      type="text"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">
                      Product description
                    </Form.ControlLabel>
                    <Form.Control
                      type="text"
                      name="productDesc"
                      required
                      defaultValue={
                        formValue.productDesc
                          ? formValue.productDesc
                          : item?.product_desc
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">
                      category
                    </Form.ControlLabel>
                    <Form.Control
                      name="category"
                      defaultValue={
                        formValue.category
                          ? formValue.category
                          : item?.category_name
                      }
                      // onChange={(e) => {
                      //   handleInput(e);
                      // }}
                      // defaultValue={item?.category_name}
                      type="text"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">
                      Sub category
                    </Form.ControlLabel>
                    <Form.Control
                      name="sub_category"
                      // onChange={(e) => {
                      //   handleInput(e);
                      // }}
                      defaultValue={
                        formValue.sub_category
                          ? formValue.sub_category
                          : item?.subcategory_name
                      }
                      type="text"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.ControlLabel className="add-label">
                      Pickup
                    </Form.ControlLabel>
                    <div
                      style={{
                        width: "50%",
                        marginTop: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      <select
                        name="selectSection"
                        value={pickup}
                        onChange={(event) => setPickup(event.target.value)}
                        style={{
                          height: "35px",
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          borderColor: "#808020",
                          width: "80%",
                        }}
                      >
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

                  <Form.Group>
                    <Form.ControlLabel className="add-label">
                      Buy
                    </Form.ControlLabel>
                    <div
                      style={{
                        width: "50%",
                        marginTop: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      <select
                        name="selectSection"
                        value={buy}
                        onChange={(event) => setBuy(event.target.value)}
                        style={{
                          height: "35px",
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          borderColor: "#808020",
                          width: "80%",
                        }}
                      >
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
                <div className="updateModelButton">
                  <ButtonComponent
                    // onClick={handleSubmit}
                    buttontext="UPDATE PRODUCT"
                  />
                </div>
              </div>
            </Form>
            <div>
              <AddAttributes
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                getProducts={getProducts}
                item={item}
              />
            </div>
            {/* {item?.attributes?.length > 0 ? ( */}

            {item?.attributes?.map((attribute, index) => (
              <div>
                <Row>
                  <Col className="cardModel" md={6} sm={12} key={index}>
                    <div className="leftSectionCard">
                      <h6>{attribute?.sku}</h6>
                      <h5>
                        {attribute?.size?.[0]?.name},{" "}
                        {attribute?.color?.[0]?.name}
                      </h5>
                      <div className="CardPriceArea">
                        <p className="priceBefore"> ₹ {attribute?.price}</p>{" "}
                        <b></b>
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
                        onClick={() => setEdit(index)}
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
                </Row>
                {edit === index && (
                  <div>
                    <UpdateAttribute
                      item={item}
                      getProducts={getProducts}
                      showUpdateModal={showUpdateModal}
                      setShowUpdateModal={setShowUpdateModal}
                    />
                  </div>
                )}
              </div>
            ))}

            <DeleteAttribute
              showModal={showModal}
              setShowModal={setShowModal}
              item={item}
              getProducts={getProducts}
            />
            {/* </div>):("")} */}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default AddProduct;
