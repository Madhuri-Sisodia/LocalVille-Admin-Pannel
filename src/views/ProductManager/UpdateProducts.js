import React, { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { Form, Row, Col } from "rsuite";
import { Http } from "../../config/Service";
import { FaCamera } from "react-icons/fa";
import "../../assets/css/modal.css";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

import ButtonComponent from "views/ButtonComponent";

import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

import editButton from "../../assets/img/editButton.png";

import AddAttributes from "./AddAttributes";
import UpdateAttribute from "./UpdateAttribute";
import DeleteAttribute from "./DeleteAttribute";
import DeleteImage from "./DeleteImage";

const UpdateProducts = ({
  showUpdateModal,
  setShowUpdateModal,
  setSelectedProducts,
  getProducts,
  item,
}) => {
  const [product, setProduct] = useState([]);

  const [pImage, setPImage] = useState(item);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [deleteAttribute, setDeleteAttribute] = useState();
  const [imageIndex, setImageIndex] = useState();

  const [productImage, setProductImage] = useState();
  const [errorImageMessage, setErrorImageMessage] = useState("");

  const [buy, setBuy] = useState("No");
  const [pickup, setPickup] = useState("No");

  const formRef = React.useRef();

  const notificationAlertRef = React.useRef(null);

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

    if (imageFile) {
      for (let i = 0; i < 4; i++) {
        data.append(`product_image[${i}]`, imageFile[i]);
      }
    }

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
  // const handleImageUpload = (event) => {
  //   const newFile = event.target.files;
  //   const updatedImageFiles = [...item.image];

  //   for (let i = 0; i < newFile.length; i++) {
  //     const newFile = files[i];
  //     console.log("File", newFile);
  //     updatedImageFiles.push(newFile);
  //   }

  //   // if (updatedImageFiles.length > 4) {
  //   //   setErrorImageMessage("Cannot upload more than 4 images.");
  //   //   updatedImageFiles.length = 4;
  //   // } else {
  //   //   setErrorImageMessage(null);
  //   // }
  //   // setErrorMessage(null);
  //   setPImage(updatedImageFiles);
  //   updateImage(newFile);

  //   // const newFile = event.target.files[0];
  //   // console.log("File", newFile);
  //   // const newItemImages = [...item.images];

  //   // newItemImages[index].images = URL.createObjectURL(newFile);

  //   // console.log("NNNN", newItemImages[index].images);
  //   // setPImage((prevItem) => ({ ...prevItem, images: newItemImages }));

  // };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedImageFiles = [...imageFile];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log("File", file);
      updatedImageFiles.push(file);
    }

    if (updatedImageFiles.length > 4) {
      setErrorImageMessage("You can upload up to 4 images.");
      updatedImageFiles.length = 4;
    } else {
      setErrorImageMessage(null);
    }

    setImageFile(updatedImageFiles);
    updateImage();
  };

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

    Http.PostAPI(process.env.REACT_APP_UPDATEPRODUCTS, data, null)
      .then((res) => {
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
        <Modal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          className="wide-modal"
        >
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
              <Form.Group className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct">
                  {" "}
                  Update Product Image
                </Form.ControlLabel>

                <div className="uploadProductImage">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {item?.images.map((image, index) => (
                      <div
                        key={index}
                        style={{ display: "inline-block", margin: "2px" }}
                      >
                        <img
                          src={image.images}
                          alt="Image"
                          style={{
                            width: "50px",
                            height: "60px",
                            borderRadius: "5px",
                          }}
                        />

                        <sup
                          className="deleteButton"
                          onClick={() => {
                            setShowImageModal(true);
                            setImageIndex(index);
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </sup>
                      </div>
                    ))}

                    {Array.isArray(imageFile) &&
                      imageFile.map((imageFile, index) => (
                        <div key={index}>
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Avatar"
                            style={{
                              width: "50px",
                              height: "60px",
                              borderRadius: "11px",
                              marginRight: "10px",
                            }}
                          />
                          <sup
                            className="deleteButton"
                            onClick={() => setShowImageModal(true)}
                          >
                            <i className="fa fa-trash"></i>
                          </sup>
                        </div>
                      ))}

                    {!errorImageMessage && (
                      <div style={{ overflow: "hidden" }}>
                        {/* {item?.images.length < 4 && ( */}
                          <label htmlFor={`avatar-upload-${imageFile.length}`}>
                            <FaCamera
                              style={{
                                fontSize: "3rem",
                                cursor: "pointer",
                                color: "#8052D5",
                                padding: "0.7rem",
                                border: "1px solid blueviolet",
                                borderRadius: "10px",
                              }}
                            />
                          </label>
                        {/* )} */}

                        {/* {(item?.images.length === 2 ||
                          item?.images.length === 3) && ( */}
                          <input
                            id={`avatar-upload-${imageFile.length}`}
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                            multiple
                          />
                        {/* )} */}

                        {/* {item?.images.length === 1 && ( */}
                          <input
                            id={`avatar-upload-${imageFile.length}`}
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                            multiple
                            max="3"
                          />
                        {/* )} */}
                      </div>
                    )}
                  </div>

                  {/* {item?.images.length >= 4 && (
                    <div style={{ color: "red" }}>
                      You cannot upload more than 4 images
                    </div>
                  )} */}

                  {/* {(item?.images.length === 2 || item?.images.length === 3) &&
                    Array.isArray(imageFile) &&
                    imageFile.length > 2 - item.images.length && (
                      <div style={{ color: "red" }}>
                        You can only upload {4 - item.images.length} more images
                      </div>
                    )} */}
{/* 
                  {item?.images.length === 1 &&
                    Array.isArray(imageFile) &&
                    imageFile.length > 3 && (
                      <div style={{ color: "red" }}>
                        You can only upload 3 more images
                      </div>
                    )} */}

             
                </div>
                {errorImageMessage && (
                    <div style={{ color: "red" }}>{errorImageMessage}</div>
                  )}

                {/* <label htmlFor="productImage">
                      <div style={{ position: "relative" }}>
                        <FaCamera
                          style={{
                            fontSize: "3rem",
                            cursor: "pointer",
                            color: "#8052D5",
                            padding: "0.7rem",
                            border: "1px solid blueviolet",
                            borderRadius: "10px",
                          }}
                        />
                        <input
                          // id={`productImage-${index}`}
                          id="productImage"
                          type="file"
                          name="productImage"
                          accept="image/*"
                          style={{ display: "none" }}
                          // onChange={(e) => handleImageUpload(e, index)}
                          onChange={handleImageUpload}
                        /> */}
                {/* </div>
                    </label> */}

                {/* <p className="maxLimit">You can upload maximum 4 images</p> */}
              </Form.Group>

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
                  <ButtonComponent buttontext="UPDATE PRODUCT" />
                </div>
              </div>
            </Form>

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
                          setDeleteAttribute(index);
                        }}
                      ></i>
                    </div>
                  </Col>
                </Row>
                {edit === index && (
                  <div>
                    <UpdateAttribute
                      item={item}
                      index={edit}
                      getProducts={getProducts}
                      showUpdateModal={showUpdateModal}
                      setShowUpdateModal={setShowUpdateModal}
                    />
                  </div>
                )}
              </div>
            ))}
            <div>
              <AddAttributes
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                getProducts={getProducts}
                item={item}
              />
            </div>
            <DeleteAttribute
              showModal={showModal}
              setShowModal={setShowModal}
              item={item}
              index={deleteAttribute}
              getProducts={getProducts}
            />
            <DeleteImage
              showImageModal={showImageModal}
              setShowImageModal={setShowImageModal}
              item={item}
              index={imageIndex}
              getProducts={getProducts}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateProducts;
