import React, { useState, useEffect,useRef } from "react";
import { MdClose } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { Form } from "rsuite";
import { Http } from "../../config/Service";
import { FaCamera } from "react-icons/fa";
import Size from "components/size";
import ButtonComponent from "views/ButtonComponent";
import ReactSelect from "CommonUtils/React-Select";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import AddProductAttributes from "./AddProductAttributes";
import "../../assets/css/modal.css";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

const AddProduct = ({
  showAddProduct,
  setShowAddProduct,
  getProducts,
  item,
}) => {
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState([]);
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

  const formRef = React.useRef();
  const isMounted = useRef(false);


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
  console.log("ITEMMM", item);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   // console.log("hello", file);
  //   setImageFile(file);
     
  // };
  // useEffect(() => {
  //   if (imageFile) {
  //     addImage();
  //   }
  // }, [imageFile]);
  useEffect(() => {
    if (isMounted.current) {
      addImage();
    } else {
      isMounted.current = true;
    }
  }, [imageFile]);
  
  const handleImageChange = (event) => {
    const files = event.target.files;
    const updatedImageFiles = [...imageFile];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log("File", file);
      updatedImageFiles.push(file);
    }

    if (updatedImageFiles.length > 4) {
      setErrorImageMessage("You can't upload more than 4 images.");
      updatedImageFiles.length = 4;
    } else {
      setErrorImageMessage(null);
    }
    setErrorMessage(null);
    setImageFile(updatedImageFiles);
    console.log("ImageFile",updatedImageFiles)
     
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

  const addImage = () => {
    const data = new FormData();

    data.append("product_id", item?.[0]?.id);

    data.append("product_name", item?.[0]?.product_name);
    // data.append("product_image", imageFile);

    if (imageFile) {
      for (let i = 0; i < 4; i++) {
        data.append(`product_image[${i}]`, imageFile[i]);
      }
    }

    Http.PostAPI(process.env.REACT_APP_ADDPRODUCTIMAGE, data, null)
      .then((res) => {
        console.log("Add Image", res);
        if (res?.data?.status) {
          setProductImage(res?.data?.data);
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

  const handleSubmit = () => {
    // event.preventDefault();
    console.log("hello");

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

    // for(let i=0;i<attributes.length;i++){
    //   data.append(`color[${i}]`,attributes[i].Color.id)
    //   data.append(`size[${i}]`,attributes[i].Size.id)
    //   data.append(`price[${i}]`,attributes[i].Price)
    //   data.append(`dis_price[${i}]`,attributes[i].dis_Price)
    //   data.append(`sku[${i}]`,attributes[i].sku)
    // }

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

  // const handleInput = (e) => {
  //   setProductData((previous) => {
  //     return { ...previous, [e.target.name]: e.target.value };
  //   });
  // };

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
          <Form
            fluid
            ref={formRef}
            // model={validationUpdateStoreModel}
            formValue={productData}
            onSubmit={handleSubmit}
            onChange={setProductData}
          >
            <Form.Group className="UpdateProductForm">
              <Form.ControlLabel className="add-label-UpdateProduct">
                {" "}
                Add Product Image
              </Form.ControlLabel>
              <div
                style={{
                  display: "flex",
                  margin: "5px",
                }}
              >
                {Array.isArray(imageFile) &&
                  imageFile.map((imageFile, index) => (
                    <div
                      key={index}
                      style={{ display: "inline-block", margin: "2px" }}
                    >
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "60px",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  ))}

                {!errorImageMessage && (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor={`avatar-upload-${imageFile.length}`}>
                      <div>
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
            </Form.Group>

            {errorImageMessage && (
              <div style={{ color: "red" }}>{errorImageMessage}</div>
            )}
              {/* <div>
                {imageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Avatar"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "11px",
                      }}
                    />

                    {/* <div style={{ marginTop: "1em" }}>
                      <button onClick={handleRemoveImage}>Remove Image</button>
                    </div> */}
                  {/* </div>
                ) : (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor="avatar-upload">
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          border: "1px dotted",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CameraRetroIcon style={{ fontSize: "64px" }} />
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </Form.Group>  */}
            {/* {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )} */}

            {/* <Form.Label className="add-label">Product Image</Form.Label>
              <Form.Control
                name="productImage"
                multiple
                onChange={(e) => {
                   setProductData((previous)=>{
                          return {...previous,productImage:e.target.files}
                   })  
                  }}
                type="file"
                required
              ></Form.Control> */}
            <div className="UpdateProductForm">
              <Form.ControlLabel className="add-label-UpdateProduct">
                {" "}
                Add Product
              </Form.ControlLabel>

              <div className="UpadateProductFormInner">
                <Form.Group>
                  <Form.ControlLabel className="formLabelText">
                    Select Vendor
                  </Form.ControlLabel>
                  <div style={{ width: "100%", marginTop: "5px" }}>
                    <ReactSelect
                      data={getStoreData}
                      setSelectSection={setSelectSection}
                    />
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel className="formLabelText">
                    Product Name
                  </Form.ControlLabel>
                  <Form.Control
                    name="productName"
                    value={productData.productName}
                    type="text"
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel className="formLabelText">
                    Product Description
                  </Form.ControlLabel>
                  <Form.Control
                    name="productDesc"
                    value={productData.productDesc}
                    type="text"
                    required
                  ></Form.Control>
                </Form.Group>

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
                      Category
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
                        name="selectSection"
                        value={selectProCat}
                        onChange={(event) =>
                          setSelectProCat(event.target.value)
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
                      SubCategory
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
                        name="selectSection"
                        value={selectProSubCat}
                        onChange={(event) =>
                          setSelectProSubCat(event.target.value)
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
                </div>

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
                      Buy
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
                        name="selectSection"
                        value={bay}
                        onChange={(event) => setBay(event.target.value)}
                        style={{
                          height: "35px",
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          borderColor: "#808020",
                          width: "10rem",
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

                  <Form.Group style={{ width: "100%" }}>
                    <Form.ControlLabel
                      className="formLabelText"
                      style={{
                        width: "100%",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Pickup
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
                        name="selectSection"
                        value={Pickup}
                        onChange={(event) => setPickup(event.target.value)}
                        style={{
                          height: "35px",
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          borderColor: "#808020",
                          width: "10rem",
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
                </div>
                <div className="updateModelButton">
                  <ButtonComponent buttontext="ADD PRODUCT" />
                </div>
              </div>
            </div>
          </Form>
          <div>
            <AddProductAttributes
              showAddProduct={showAddProduct}
              setShowAddProduct={setShowAddProduct}
              getProducts={getProducts}
              item={item}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddProduct;
