import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";
import { get } from "jquery";

const AddProduct = ({ showAddProduct, setShowAddProduct, getProduct }) => {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(null);
  const [vendortData,setVendorData] = useState([])
  const [selectSection,setSelectSection] = useState("")
  const [getStoreData,setGetStoreData] = useState([])
  console.log("heelo from addproduct")
  console.log("storeData=>",getStoreData)

  const [productData, setProductData] = useState({
    // productImage: "",
    productName: "",
    productDesc: "",
    category: "",
    sub_category: "",
    is_buy: "",
    is_pickup: "",
    color: "",
    size: "",
    price: "",
    dis_price: "",
    in_stock: "",

  });

  console.log(productData);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductData((previous) => {
      return { ...previous, productImage: file };
    });
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
      color: "",
      in_stock: "",
      size: "",
      price: "",
      dis_price: "",

    });
    setImage(null);
  };


  const getStore = () => {
    console.log("hello")
    Http.GetAPI(apis.getStoreData + "?" + Math.random(), "", null)
      .then((res) => {
        if (res?.data?.status) {
           if(res.data.data.length>0){
            setGetStoreData(res?.data?.data);
           }
           else{
            setDisabledNext(false)
           }
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  useEffect(() => {
    getStore();
  }, []);




  const handleSubmit = (event) => {
    event.preventDefault();

    const vendorid = getStoreData.filter((ele)=>{
      return(ele.email==selectSection)
          })
    var data = new FormData();

    data.append("vendor_id",vendorid[0].vendor_id)
    data.append("store_id",vendorid[0].id)
    data.append("product_name", productData.productName);
    data.append("product_desc", productData.productDesc);
    data.append("category", productData.category);
    data.append("sub_category", productData.sub_category);
    data.append("is_buy", productData.is_buy);
    data.append("is_pickup", productData.is_pickup);
    data.append("color", productData.color);
    data.append("size", productData.size);
    data.append("price", productData.price);
    data.append("dis_price", productData.dis_price);
    data.append("in_stock", productData.in_stock);
   
    Http.PostAPI(apis.addProducts, data, null)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setProduct(res?.data?.data);
          getProduct();
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        // console.log("Error:", e);
      });
    resetForm();
    setShowAddProduct(false);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setProductData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };


  return (
    <>
      <Modal show={showAddProduct} onHide={() => setShowAddProduct(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Products</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddProduct(false);
              resetForm();
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group controlId="ProductImage">
              <Form.Label className="add-label">Product Image</Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              /> */}

            {/* {errors.productImage && (
                <Form.Text className="text-danger">
                  {errors.productImage}
                </Form.Text>
              )} */}
            {/* </Form.Group> */}

            <Form.Group>
            <Form.Label className="add-label">Select Vendor</Form.Label>
            <div style={{width:"50%",marginTop:"5px",marginBottom:"15px"}}>
              <select
                name="selectSection"
                value={selectSection}
               onChange={(event) => setSelectSection(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"80%"}}  
               >
                <option value="">Select</option>
                {getStoreData.map((category,index) => (
                  <option key={category.id} value={category.email} style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                    {` ${index+1} ${"   "} Name:${category.store_name},${"        "} \n vendorName:${category.name}`} 
                    </li>
                  </option>
                ))}
              </select>
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

            <Form.Group>
              <Form.Label className="add-label">Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">SubCategory</Form.Label>
              <Form.Control
                type="text"
                name="sub_category"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Buy</Form.Label>
              <Form.Control
                type="text"
                name="is_buy"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Pickup</Form.Label>
              <Form.Control
                type="text"
                name="is_pickup"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="add-label">Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Discounted Price</Form.Label>
              <Form.Control
                type="text"
                name="dis_price"
                required
                onChange={(e) => {
                  handleInput(e);
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
            >
              Add
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddProduct;
