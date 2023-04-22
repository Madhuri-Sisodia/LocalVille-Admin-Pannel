import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
// import { Modal, Form, Button } from "react-bootstrap";
import { Modal, Form, Uploader, Row, Col, Placeholder, Button, ButtonToolbar } from 'rsuite';
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import Size from "components/size";
import { get } from "jquery";
import ButtonComponent from "views/ButtonComponent";
import UpdateAttributes from "components/updateAttributes";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Image from "../../assets/img/dummyproduct.jpeg";
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import ViewProductModal from "./ViewProductModal";
import editButton from "../../assets/img/editButton.png";
import UpdateAttribute from "./UpdateAttribute";
import { Collapse } from 'react-collapse';

const AddProduct = ({
  showUpdateModal,
  setShowUpdateModal,
  setSelectedProducts,
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
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // const Card = props => (

  //   <Placeholder.Paragraph />

  // );
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

  const increaseIngridents = (e) => {
    console.log('calling', showAddProduct)
    e.preventDefault()
    // setingridents([...ingridents, ""]);
    setShowAddProduct(true);
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
    data.append(
      "category_name",
      productData?.category ? productData.category : item.category
    );
    data.append(
      "subcategory_name",
      productData?.sub_category ? productData.sub_category : item.sub_category
    );
    data.append("is_buy", bay ? (bay == "Yes" ? 1 : 0) : item?.is_buy);
    data.append(
      "is_pickup",
      Pickup ? (Pickup == "Yes" ? 1 : 0) : item?.is_pickup
    );

    Http.PostAPI(process.env.REACT_APP_UPDATEPRODUCTS, data, null)
      .then((res) => {
        console.log("response....", res);
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
        <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
          <Modal.Header>
            <Modal.Title className="titleUpdateProduct">UPDATE PRODUCT</Modal.Title>
            {/* <MdClose
              className="close-icon"
              onClick={() => {
                setShowUpdateModal(false);
                resetForm();
              }}
            />  */}
          </Modal.Header>
          <Modal.Body className="add-body updateProductModel">
            <Form>
              <Form.Group className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct"> Upload Product Image</Form.ControlLabel>
                {/* <div>
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
                </div>  */}
                <div className="uploadProductImage">
                  <div>
                    <img src={Image} className="uploadImage" />
                    <sup className="deleteButton"><i className="fa fa-trash"></i></sup>
                  </div>
                  <div>
                    <img src={Image} className="uploadImage" />
                    <sup className="deleteButton"><i className="fa fa-trash"></i></sup>
                  </div>
                  <div>
                    <img src={Image} className="uploadImage" />
                    <sup className="deleteButton"><i className="fa fa-trash"></i></sup>
                  </div>



                  <Uploader multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/">
                    <button>
                      <i className="fa fa-camera"></i>
                    </button>
                  </Uploader>
                </div>

                <p className="maxLimit">You can upload maximum 4 images</p>
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
              </Form.Group>

              <Form.Group className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct"> Update Product</Form.ControlLabel>

               

                <Form fluid className="UpadateProductFormInner">
                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">Product Name</Form.ControlLabel>
                    <Form.Control
                      name="productName"
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      defaultValue={item?.product_name}
                      type="text"
                      required
                    >
                    </Form.Control>

                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">Product description</Form.ControlLabel>
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
                    <Form.ControlLabel className="formLabelText">category</Form.ControlLabel>
                    <Form.Control
                      name="category"
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      defaultValue={item?.category_name}
                      type="text"
                      disabled
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.ControlLabel className="formLabelText">Sub category</Form.ControlLabel>
                    <Form.Control
                      name="sub_category"
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      defaultValue={item?.subcategory_name}
                      type="text"
                      disabled
                    >
                    </Form.Control>
                  </Form.Group>
                </Form>


                <div className="updateModelButton">
                  <ButtonComponent buttontext="UPDATE PRODUCT" /></div>
              </Form.Group>

              <Form.Group className="UpdateProductForm">
                {/* <Form.ControlLabel className="add-label">
                 
                </Form.ControlLabel> */}

                <Row>
                  <Col className="cardModel" md={6} sm={12}>
                    <div className="leftSectionCard">
                      <h6> SKU234567892345</h6>
                      <h5>XLL,Black</h5>
                      <div className="CardPriceArea">
                        <p className="priceBefore"> ₹ 2100</p> <b></b>
                        <h6 className="priceAfter"> ₹ 2100</h6> </div>
                    </div>
                    <div className="RightSectionCard">
                      <img src={editButton} className="editbutton" />
                      <i className="fa fa-trash"></i>
                    </div>
                  </Col></Row>
                <Row>
                  <Col className="cardModel" md={6} sm={12}>
                    <div className="leftSectionCard">
                      <h6> SKU234567892345</h6>
                      <h5>XLL,Black</h5>
                      <div className="CardPriceArea">
                        <p className="priceBefore"> ₹ 2100</p> <b></b>
                        <h6 className="priceAfter"> ₹ 2100</h6> </div>
                    </div>
                    <div className="RightSectionCard">
                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            
              
              <img src={editButton} className="editbutton" />
                      </button>
                      



                      <i className="fa fa-trash"></i>
                    </div>
                  </Col> </Row>



                  <div className="collapseAttribute" id="collapseExample">
                    
                  
                 
                  <Form  layout="inline" style={{ display:"flex",
                    justifyContent:"space-between"}}>
                  <Form.Group  >
                  <Form.ControlLabel className="formLabelText">Size</Form.ControlLabel>
                  <Form.Control
                      
                     
                      type="text"
                      style={{ width: 170,
                        marginBottom:"-10px"
                       }}
                    >
                    </Form.Control>
                    </Form.Group>
                    <Form.Group style={{ textAlign:"left"}} >
                  
                  <Form.ControlLabel className="formLabelText">Color</Form.ControlLabel>
                  <Form.Control
                      
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      
                      type="text"
                      style={{ width: 170 ,marginBottom:"-10px"
                      }}
                    >
                    </Form.Control>
                    </Form.Group>
                  </Form>

                  <Form  layout="inline" style={{display:"flex", justifyContent:"space-between"}}>
                  <Form.Group  >
                  <Form.ControlLabel className="formLabelText">Price</Form.ControlLabel>
                  <Form.Control
                      
                      
                      type="text"
                      style={{ width: 170, marginBottom:"-10px" }}
                    >
                    </Form.Control>
                    </Form.Group>
                    <Form.Group style={{ textAlign:"left"}} >
                  
                  <Form.ControlLabel className="formLabelText">Discounted Price</Form.ControlLabel>
                  <Form.Control
                      
                      onChange={(e) => {
                        handleInput(e);
                      }}
                     
                      type="text"
                      style={{ width: 170,marginBottom:"-15px" }}
                    >
                    </Form.Control>
                    </Form.Group>
                  </Form>
                  <Form  layout="inline" style={{ display:"flex",justifyContent:"space-between"}}>
                  <Form.Group  >
                  <Form.ControlLabel className="formLabelText"> GST</Form.ControlLabel>
                  <Form.Control
                      
                      
                      type="text"
                      style={{ width: 170, marginBottom:"-15px" }}
                    >
                    </Form.Control>
                    </Form.Group>
                    <Form.Group style={{ textAlign:"left"}} >
                  
                  <Form.ControlLabel className="formLabelText">OTY</Form.ControlLabel>
                  <Form.Control
                      
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      
                      type="text"
                      style={{ width: 170, marginBottom:"-15px" }}
                    >
                    </Form.Control>
                    </Form.Group>
                  </Form>

                  <Form  fluid>
                  <Form.ControlLabel className="formLabelText">SKU</Form.ControlLabel>
                  <Form.Control>

                  </Form.Control>
                  <div className="updateModelButton">
                  <ButtonComponent buttontext="UPDATE ATTRIBUTE" /></div>
                  </Form>


                 
                      </div>

              </Form.Group>
              

              {/* 
              <Form.Group>
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
              </div>    */}




              {/* <Form.Group>
                 <Form.ControlLabel className="add-label">Buy</Form.ControlLabel> 
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
              </Form.Group> */}

              {/* <Form.Group>
                 <Form.ControlLabel className="add-label">Pickup</Form.ControlLabel> 
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
              </Form.Group> */}

              {/* <button onClick={handleSubmit}>submit</button>
              <ButtonComponent buttontext="Update" /> */}



            </Form>
          </Modal.Body>
        </Modal >
      )}
    </>
  );
};
export default AddProduct;
