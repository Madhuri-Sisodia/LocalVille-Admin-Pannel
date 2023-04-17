import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import Size from "components/size";
import { get } from "jquery";
import ButtonComponent from "views/ButtonComponent";
import UpdateAttributes from "components/updateAttributes";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const AddProduct = ({
  showUpdateModal,
  setShowUpdateModal,
  getProducts,
  item,
}) => {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(null);
  const [vendortData, setVendorData] = useState([]);
  const [selectSection, setSelectSection] = useState("");
  const [getStoreData, setGetStoreData] = useState([]);
  const [getProcat, setGetProCat] = useState([]);
  const [getProSubcat, setGetProSubCat] = useState([]);
  const [selectProCat, setSelectProCat] = useState("");
  const [selectProSubCat, setSelectProSubCat] = useState("");
  const [getsize, setGetSize] = useState([]);
  const [color, setColor] = useState([]);
  const [bay, setBay] = useState("No");
  const [Pickup, setPickup] = useState("No");
  const [productPrice, setProductPrice] = useState([]);
  const [productDiscountPrice, setProductDiscountPrice] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [isAddProdcut, setIsAddProduct] = useState(false);

  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    category: "",
    sub_category: "",
    is_buy: "",
    is_pickup: "",
    color: false,
    size: false,
    price: "",
    dis_price: "",
    in_stock: 1,
    productImage: "",
  });
  const notificationAlertRef = React.useRef(null);

  const resetForm = () => {
    setProductData({
      // productImage: "",
      productName: "",
      productDesc: "",
      category: "",
      sub_category: "",
      is_buy: "",
      is_pickup: "",
      in_stock: "",
    });
    setImage(null);
  };

  useEffect(() => {
    if (item) {
      setAttributes(item?.attributes);
    }
  }, [item]);

  const updateImage = () => {
    const data = new FormData();
    data.append("product_image", productData?.productImage?.[0]);
    data.append(
      "product_name",
      productData?.productName ? productData.productName : item.product_name
    );
    data.append("product_id", item.id);
    Http.PostAPI(process.env.REACT_APP_UPDATEPRODUCTIMAGE, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setProduct(res?.data?.data);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateImage();
    var data = new FormData();
    data.append("pid", item.id);
    data.append(
      "product_name",
      productData?.productName ? productData.productName : item.product_name
    );
    data.append(
      "product_desc",
      productData?.productDesc ? productData.productDesc : item.product_desc
    );
    data.append("is_buy", bay ? (bay == "Yes" ? 1 : 0) : item?.is_buy);
    data.append(
      "is_pickup",
      Pickup ? (Pickup == "Yes" ? 1 : 0) : item?.is_pickup
    );

    Http.PostAPI(process.env.REACT_APP_UPDATEPRODUCTS, data, null)
      .then((res) => {
        console.log("response....",res);
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

    resetForm();
    setShowUpdateModal(false);
    setGetSize([]);
    setColor([]);
    setProductPrice([]);
    setProductDiscountPrice([]);
  };

  const handleInput = (e) => {
    setProductData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
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
            <Modal.Title className="title">Update Products</Modal.Title>
            <MdClose
              className="close-icon"
              onClick={() => {
                setShowUpdateModal(false);
                resetForm();
              }}
            />
          </Modal.Header>
          <Modal.Body className="add-body">
            <Form>
              <Form.Group>
                <Form.Label className="add-label">Product Image</Form.Label>
                <div>
                  <img
                    src={
                      productData?.productImage
                        ? productData?.productImage
                        : item.theme_img
                    }
                    alt="image"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <Form.Control
                  name="productImage"
                  multiple
                  onChange={(e) => {
                    setProductData((previous) => {
                      return { ...previous, productImage: e.target.files };
                    });
                  }}
                  type="file"
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Product Name</Form.Label>
                <Form.Control
                  name="productName"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  defaultValue={item?.product_name}
                  type="text"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">
                  Product Description
                </Form.Label>
                <Form.Control
                  type="text"
                  name="productDesc"
                  required
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  defaultValue={item?.product_desc}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Update Attributes</Form.Label>
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

              <Form.Group>
                <Form.Label className="add-label">Buy</Form.Label>
                <div
                  style={{
                    width: "50%",
                    marginTop: "5px",
                    marginBottom: "15px",
                  }}
                >
                  <select
                    name="selectSection"
                    value={bay}
                    onChange={(event) => setBay(event.target.value)}
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
                <Form.Label className="add-label">Pickup</Form.Label>
                <div
                  style={{
                    width: "50%",
                    marginTop: "5px",
                    marginBottom: "15px",
                  }}
                >
                  <select
                    name="selectSection"
                    value={Pickup}
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

              <button onClick={handleSubmit}>submit</button>
              <ButtonComponent buttontext="Update" />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default AddProduct;
