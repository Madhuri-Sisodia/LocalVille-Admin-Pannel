import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import Size from "components/size";
import ButtonComponent from "views/ButtonComponent";
import ReactSelect from "CommonUtils/React-Select";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import AddProductAttributes from "./AddProductAttributes";

const AddProduct = ({ showAddProduct, setShowAddProduct, getProducts }) => {
  const [product, setProduct] = useState([]);
  const[showAddAttribute,setShowAddAttribute]=useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorImageMessage, setErrorImageMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState([]);
  const [vendortData, setVendorData] = useState([]);
  const [selectSection, setSelectSection] = useState("");
  const [getStoreData, setGetStoreData] = useState([]);
  const [getProcat, setGetProCat] = useState([]);
  const [getProSubcat, setGetProSubCat] = useState([]);
  const [selectProCat, setSelectProCat] = useState("");
  const [selectProSubCat, setSelectProSubCat] = useState("");
  const [bay, setBay] = useState("No");
  const [Pickup, setPickup] = useState("No");
  const [attributes, setAttributes] = useState([]);
  const [isAddProdcut, setIsAddProduct] = useState("true");
  const notificationAlertRef = React.useRef(null);

  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    category: "",
    sub_category: "",
    is_buy: "",
    is_pickup: "",
    Attributes: "",
    price: "",
    dis_price: "",
    in_stock: "",
    productImage: "",
  });

  const handleImageChange = (event) => {
    const files = event.target.files;
    const updatedImageFiles = [...imageFile];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log("File", file);
      updatedImageFiles.push(file);
    }

    if (updatedImageFiles.length > 4) {
      setErrorImageMessage("Cannot upload more than 4 images.");
      updatedImageFiles.length = 4;
    } else {
      setErrorImageMessage(null);
    }
    setErrorMessage(null);
    setImageFile(updatedImageFiles);
  };

  const resetForm = () => {
    setProductData({
      // productImage: "",
      productName: "",
      productDesc: "",
      category: "",
      sub_category: "",
      is_buy: "",
      is_pickup: "",
      in_stock: 1,
    });
    setImage(null);
  };

  useEffect(() => {
    Http.GetAPI(process.env.REACT_APP_GETPRODUCTCATEGORY, "", null)
      .then((res) => {
        if (res?.data?.status) {
          setGetProCat(res?.data?.data);
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  }, []);

  useEffect(() => {
    if (selectProCat) {
      const vendorid = getProcat.filter((ele) => {
        return ele.name == selectProCat;
      });

      Http.GetAPI(
        process.env.REACT_APP_GETPRODSUBCATEGORY +
          "?" +
          `category_id=${vendorid[0].id}`,
        "",
        null
      )
        .then((res) => {
          if (res?.data?.status) {
            setGetProSubCat(res?.data?.data);
          }
        })
        .catch((e) => {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });
    }
  }, [selectProCat]);

  const getStore = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETSTOREDATA + "?" + Math.random(),
      "",
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          if (res.data.data.length > 0) {
            setGetStoreData(res?.data?.data);
          } else {
            setDisabledNext(false);
          }
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };

  useEffect(() => {
    getStore();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // const vendorid = getStoreData.filter((ele)=>{
    //   return(ele.email==selectSection.value)
    //       })

    const Catgoryid = getProcat.filter((ele) => {
      return ele.name == selectProCat;
    });

    const subCateoryid = getProSubcat.filter((ele) => {
      return ele.name == selectProSubCat;
    });

    const id = selectSection?.value;
    var data = new FormData();

    data.append("vendor_id", id);
    data.append("store_id", id);
    data.append("product_name", productData.productName);
    data.append("product_desc", productData.productDesc);
    data.append("category", Catgoryid[0].id);
    data.append("sub_category", subCateoryid[0].id);
    data.append("is_buy", bay == "Yes" ? 1 : 0);
    data.append("is_pickup", Pickup == "Yes" ? 1 : 0);
    data.append("in_stock", productData.in_stock);

    if (imageFile) {
      for (let i = 0; i < 4; i++) {
        data.append(`product_images[${i}]`, imageFile[i]);
      }
    }

    for (let i = 0; i < attributes.length; i++) {
      data.append(`color[${i}]`, attributes[i].Color.id);
      data.append(`size[${i}]`, attributes[i].Size.id);
      data.append(`price[${i}]`, attributes[i].Price);
      data.append(`dis_price[${i}]`, attributes[i].dis_Price);
      data.append(`sku[${i}]`, attributes[i].sku);
    }

    Http.PostAPI(process.env.REACT_APP_ADDPRODUCTS, data, null)
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
    resetForm();
    setImageFile("");
    setShowAddProduct(false);
    setAttributes([]);
    setProductData({
      productName: "",
      productDesc: "",
      category: "",
      sub_category: "",
      is_buy: "",
      is_pickup: "",
      Attributes: [],
      price: "",
      dis_price: "",
      in_stock: "",
      productImage: "",
    });
    setSelectProSubCat("");
    setSelectProCat("");
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
      <Modal show={showAddProduct} onHide={() => setShowAddProduct(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Products</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddProduct(false);
              setImageFile("");
              setErrorImageMessage("");
              resetForm();
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="file" className="add-label">
                Product Image
              </Form.Label>
              <div
                style={{
                  overflow: "hidden",
                  display: "flex",
                  flexWrap: "nowrap",
                }}
              >
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
                    </div>
                  ))}

                {!errorImageMessage && (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor={`avatar-upload-${imageFile.length}`}>
                      <div
                        style={{
                          color: "blueviolet",
                          width: "55px",
                          height: "55px",
                          border: "1px dotted",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CameraRetroIcon style={{ fontSize: "35px" }} />
                      </div>
                    </label>
                    <input
                      id={`avatar-upload-${imageFile.length}`}
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      multiple
                    />
                  </div>
                )}
              </div>

              {errorImageMessage && (
                <div style={{ color: "red" }}>{errorImageMessage}</div>
              )}

              <Form.Label className="add-label">Select Vendor</Form.Label>
              <div style={{ width: "100%", marginTop: "5px" }}>
                <ReactSelect
                  data={getStoreData}
                  setSelectSection={setSelectSection}
                />
              </div>

              <Form.Label className="add-label">Product Name</Form.Label>
              <Form.Control
                name="productName"
                onChange={(e) => {
                  handleInput(e);
                }}
                type="text"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Product Description</Form.Label>
              <Form.Control
                type="text"
                name="productDesc"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>
            <br></br>

            <button
             data-bs-toggle="collapse"
             data-bs-target="#collapseExample"
             aria-expanded="false"
             aria-controls="collapseExample"
              style={{
                color: "blueviolet",
                width: "100%",
                border: "2px dotted",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
              }}
              onClick={() => {
                setShowAddAttribute(true);
              }}
            >
              Add Attributes
            </button>
            <div>
                    <AddProductAttributes
                      showAddAttribute={showAddAttribute}
                      setShowAddAttribute={setShowAddAttribute}
                    />
                  </div>
            {/* <Form.Group>
              <Form.Label className="add-label">Add Attributes</Form.Label>
               <Size 
               setAttributes={setAttributes}
               isAddProduct = {[]}
               attributes={attributes}
               />
            </Form.Group> */}

            <Form.Group>
              <Form.Label className="add-label">Category</Form.Label>
              <div
                style={{ width: "50%", marginTop: "5px", marginBottom: "15px" }}
              >
                <select
                  name="selectSection"
                  value={selectProCat}
                  onChange={(event) => setSelectProCat(event.target.value)}
                  style={{
                    height: "35px",
                    borderRadius: "5px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderColor: "#808020",
                    width: "80%",
                  }}
                >
                  <option value="">Select</option>
                  {getProcat.map((category, index) => (
                    <option
                      key={category.id}
                      value={category.email}
                      style={{
                        fontSize: "14px",
                        paddingBottom: "10px",
                        paddintTop: "10px",
                      }}
                    >
                      <li>{`${category.name}`}</li>
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">SubCategory</Form.Label>
              <div
                style={{ width: "50%", marginTop: "5px", marginBottom: "15px" }}
              >
                <select
                  name="selectSection"
                  value={selectProSubCat}
                  onChange={(event) => setSelectProSubCat(event.target.value)}
                  style={{
                    height: "35px",
                    borderRadius: "5px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderColor: "#808020",
                    width: "80%",
                  }}
                >
                  <option value="">Select</option>
                  {getProSubcat.map((category, index) => (
                    <option
                      key={category.id}
                      value={category.email}
                      style={{
                        fontSize: "14px",
                        paddingBottom: "10px",
                        paddintTop: "10px",
                      }}
                    >
                      <li>{`${category.name}`}</li>
                    </option>
                  ))}
                </select>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Buy</Form.Label>
              <div
                style={{ width: "50%", marginTop: "5px", marginBottom: "15px" }}
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

            <Form.Group>
              <Form.Label className="add-label">Pickup</Form.Label>
              <div
                style={{ width: "50%", marginTop: "5px", marginBottom: "15px" }}
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

            <ButtonComponent buttontext="Add" />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddProduct;
