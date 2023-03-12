import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form,} from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/modal.css";
import Size from "components/size";


const AddProduct = ({ showAddProduct, setShowAddProduct, getProduct }) => {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(null);
  const [vendortData,setVendorData] = useState([])
  const [selectSection,setSelectSection] = useState("")
  const [getStoreData,setGetStoreData] = useState([])
  const [getProcat,setGetProCat] = useState([])
  const [getProSubcat,setGetProSubCat] = useState([])
  const [selectProCat,setSelectProCat] = useState("")
  const [selectProSubCat,setSelectProSubCat] = useState("")
  const [bay,setBay] = useState("No")
  const [Pickup,setPickup] = useState("No")
  const [attributes,setAttributes] = useState([])
  console.log("att=>",attributes)
  const notificationAlertRef = React.useRef(null);

  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    category: "",
    sub_category: "",
    is_buy: "",
    is_pickup: "",
    Attributes:"",
    price: "",
    dis_price: "",
    in_stock: "",
    productImage:""
  });

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
    Http.GetAPI(apis.getProductCategory ,"", null)
      .then((res) => {
        if (res?.data?.status) {
          setGetProCat(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  }, []);


  useEffect(() => {
    if(selectProCat){
     console.log()
      const vendorid = getProcat.filter((ele)=>{
        return(ele.name==selectProCat)
            })

            console.log(vendorid)

      
      Http.GetAPI(apis.getProdSubCategory + "?" + `category_id=${vendorid[0].id}`, "", null)
      .then((res) => {
        if (res?.data?.status) {
          setGetProSubCat(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
    }
  }, [selectProCat]);
  
  const getStore = () => {
    console.log("hello")
    Http.GetAPI(apis.getStoreData + "?" + Math.random(), "", null)
      .then((res) => {
        if (res?.data?.status) {
           if(res.data.data.length>0){
            setGetStoreData(res?.data?.data);
            console.log("store=>",res.data.data)
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

    const Catgoryid = getProcat.filter((ele)=>{
            return(ele.name==selectProCat)
                })

 
    const subCateoryid = getProSubcat.filter((ele)=>{
                  return(ele.name==selectProSubCat)
                      })



    var data = new FormData();

    data.append("vendor_id",vendorid[0]?.vendor_id)
    data.append("store_id",vendorid[0]?.id)
    data.append("product_name", productData.productName);
    data.append("product_desc", productData.productDesc);
    data.append("category", Catgoryid[0].id);
    data.append("sub_category",subCateoryid[0].id);
    data.append("is_buy", (bay=="Yes")?1:0);
    data.append("is_pickup", (Pickup=="Yes")?1:0);
    data.append("in_stock", productData.in_stock);
    
     if(productData.productImage){
      for(let i=0;i<4;i++){
        data.append(`product_images[${i}]`,productData?.productImage[i])
      }
    }

    for(let i=0;i<attributes.length;i++){
      data.append(`color[${i}]`,attributes[i].Color.id)
      data.append(`size[${i}]`,attributes[i].Size.id)
      data.append(`price[${i}]`,attributes[i].Price)
      data.append(`dis_price[${i}]`,attributes[i].dis_Price)
    }
   
    Http.PostAPI(apis.addProducts, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setProduct(res?.data?.data);
          getProduct();
          alert("Product Added Sucessfully")
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
    resetForm();
    setShowAddProduct(false);
    setAttributes([])
    setProductData({
      productName: "",
      productDesc: "",
      category: "",
      sub_category: "",
      is_buy: "",
      is_pickup: "",
      Attributes:"",
      price: "",
      dis_price: "",
      in_stock: "",
      productImage:""
    })
    setSelectProSubCat("")
    setSelectProCat("")
  };

  const handleInput = (e) => {
    console.log(e.target.value);
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
              resetForm();
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label className="add-label">Product Image</Form.Label>
              <Form.Control
                name="productImage"
                multiple
                onChange={(e) => {
                  console.log(e.target.files)
                   setProductData((previous)=>{
                          return {...previous,productImage:e.target.files}
                   })  
                  }}
                type="file"
              ></Form.Control>

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
              <div style={{width:"50%",marginTop:"5px",marginBottom:"15px"}}>
              <select
                name="selectSection"
                value={selectProCat}
               onChange={(event) => setSelectProCat(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"80%"}}  
               >
                <option value="">Select</option>
                {getProcat.map((category,index) => (
                  <option key={category.id} value={category.email} style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                    {`${category.name}`} 
                    </li>
                  </option>
                ))}
              </select>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">SubCategory</Form.Label>
              <div style={{width:"50%",marginTop:"5px",marginBottom:"15px"}}>
              <select
                name="selectSection"
                value={selectProSubCat}
               onChange={(event) => setSelectProSubCat(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"80%"}}  
               >
                <option value="">Select</option>
                {getProSubcat.map((category,index) => (
                  <option key={category.id} value={category.email} style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                    {`${category.name}`} 
                    </li>
                  </option>
                ))}
              </select>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Buy</Form.Label>
              <div style={{width:"50%",marginTop:"5px",marginBottom:"15px"}}>
              <select
                name="selectSection"
                value={bay}
               onChange={(event) => setBay(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"80%"}}  
               >
                <option value="">Select</option>  
                  <option  style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                     Yes
                    </li>
                  </option>
                  <option  style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                     No
                    </li>
                  </option>
              </select>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Add Attributes</Form.Label>
               <Size 
               setAttributes={setAttributes}
               attributes={attributes}
               />
            </Form.Group>
            <Form.Group>
              <Form.Label className="add-label">Pickup</Form.Label>
              <div style={{width:"50%",marginTop:"5px",marginBottom:"15px"}}>
              <select
                name="selectSection"
                value={Pickup}
               onChange={(event) => setPickup(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"80%"}}  
               >
                <option value="">Select</option>  
                  <option  style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                     Yes
                    </li>
                  </option>
                  <option  style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                    <li>
                     No
                    </li>
                  </option>
              </select>
              </div>
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
