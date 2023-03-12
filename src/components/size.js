import UpdateProduct from "./updateProduct";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../config/Service";
import { apis } from "../config/WebConstant";
import "../assets/css/day.css";
import {ColorSize} from "../CommonUtils/ColorSize"

const Size  = ({getSize,price,disPrice,getColor})=>{
     const [showAddProduct, setShowAddProduct] = useState(false);
    const [ingridents, setingridents] = useState([])
    const [sizeData,setSizeData] = useState([])
    const [colorData,setColorData] = useState([])
    const [getSelectedSize,setGetSelectedSize] = useState("")
    const [getSelectedColor,setGetSelectedColor] = useState("")
    const [discountPrice,setDiscountPrice] = useState("")
    const [NewPrice,setNewPrice] = useState("")

    const increaseIngridents = ()=>{
        setingridents([...ingridents,""])
        setShowAddProduct(true)
   }
  
  const deleteIngredent = (e)=>{
       const Result = [...ingridents] 
       Result.splice(e.target.id,1)
       console.log(Result)
       setingridents(Result)
  }

  
  useEffect(()=>{
     function ColorSize (){
          Http.GetAPI(apis.getSize,"")
          .then((res) => {
            if (res?.data?.status) {
               setSizeData(res?.data?.data);
               console.log(res.data.data)
            } else {
              alert("Fields not matched");
            }
          })
          .catch((e) => {
            alert("Something went wrong.");
            console.log("Error:", e);
          });
        }

        ColorSize()
  },[])



  useEffect(()=>{
     function ColorSize (){
          Http.GetAPI(apis.getColor,"")
          .then((res) => {
            if (res?.data?.status) {
               setColorData(res?.data?.data);
               console.log(res.data.data)
            } else {
              alert("Fields not matched");
            }
          })
          .catch((e) => {
            alert("Something went wrong.");
            console.log("Error:", e);
          });
        }

        ColorSize()
  },[])

  const Submit = (event) => {
     event.preventDefault();
     sizeData.filter((ele)=>{
         if(ele.name==getSelectedSize){
          console.log(ele.name)
           getSize((previous)=>{
               return [...previous ,ele]
           })
         }
     })
     price((previous)=>{
          return [...previous,NewPrice]
     })
     disPrice((previous)=>{
             return [...previous,discountPrice]
     })
     
     colorData.filter((ele)=>{
          if(ele.name==getSelectedColor){
               getColor((previous)=>{
                   return [...previous ,ele]
               })
             }
     })

     setShowAddProduct(false)
   };

 return(
    <>
    <div style={{borderBottom:"1px solid gray",margin:"10px"}}>
         <p>
          Attributes:
         </p>
         <ul>
         {
            ingridents.map((ele,index)=>{
                return(
                 <>
                <li style={{borderBottom:"1px solid gray",margin:"5px 0px",fontSize:"14px",listStyle:"none",margin:"5px"}}>
                <Modal show={showAddProduct} onHide={() => setShowAddProduct(false)}
                >
        <Modal.Header>
          <Modal.Title className="title"
          >Add Attributes</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddProduct(false);
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form>
               <div style={{display:"flex",flexDirection:"row"}}>
            <Form.Group style={{width:"50%"}}>
              <Form.Label className="add-label"
              style={{width:"100%",marginTop:"5px",marginBottom:"5px",}}
              >Color</Form.Label>
              <div style={{width:"100%",margin:"auto",marginTop:"5px",marginBottom:"5px",paddingRight:"10px"}}>
              <select
                name="selectSection"
                value={getSelectedColor}
               onChange={(event) => setGetSelectedColor(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"100%"}}  
               >
                <option value="">Select</option>
                {
                  colorData?.map((ele)=>(
                    <option  style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                        {ele.name}
                    </option>
                  ))
                }
                  
              </select>
              </div>
            </Form.Group>
            <Form.Group style={{width:"50%"}}>
              <Form.Label className="add-label"
               style={{width:"100%",marginTop:"5px",marginBottom:"5px",paddingLeft:"10px"}}
              >Size</Form.Label>
              <div style={{width:"100%",margin:"auto",marginTop:"5px",marginBottom:"5px",paddingLeft:"10px"}}>
              <select
                name="selectSection"
                value={getSelectedSize}
               onChange={(event) => setGetSelectedSize(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"100%"}}  
               >
                <option value="">Select</option>  
                {
                  sizeData?.map((ele)=>(
                    <option  style={{fontSize:"14px",paddingBottom:"10px",paddintTop:"10px"}}>
                        {ele.name}
                    </option>
                  ))
                }
              </select>
              </div>
            </Form.Group>
            </div>
            <Form.Group>
              <Form.Label className="add-label">Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                required
                onChange={(e) => {
                    setNewPrice(e.target.value);
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
                    setDiscountPrice(e.target.value);
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

                 
                        <Button
                              id={index} 
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={deleteIngredent}
                            >
                              <i className="fas fa-times"
                              ></i>
                            </Button>
                 
                 </li>
                 </>)
            })
         }
         </ul>
         <button onClick={increaseIngridents} style={{color:"black",fontSize:"12px",margin:"auto"}}>Add Attributes</button>
      </div>
    </>
 )

}


export default Size;