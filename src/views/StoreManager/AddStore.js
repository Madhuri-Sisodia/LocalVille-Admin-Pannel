import React, { useState, useEffect, useContext } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import GoogleAutocomplete from "components/googleAutoComplete";
import GooglePlacesPicker from "components/googlePlacesPicker";
import { Utils } from "CommonUtils/Utils";
// import 'react-select-search/style.css'
import axios from "axios";
import { SelectPicker } from 'rsuite';
import { visitIterationBody } from "typescript";
import ButtonComponent from "views/ButtonComponent";
import ReactSelect from "CommonUtils/React-Select";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";


    

const AddStore = ({ showAddStore, setShowAddStore, getStore,addStore }) => {
  const [store, setStore] = useState([]);
  const [image, setImage] = useState(null);
  const [selectSection,setSelectSection] = useState("")
  const [vendortData,setVendorData] = useState([])
  const [storeImage,setStoreImage] = useState([])
  const {location} = useContext(Utils)
  console.log("location=>",location)
  const [Data,setData] = useState([])
  const [storeData, setStoreData] = useState({
    storeName: "",
    storeDesc: "",
    address: "",
    latitude: "",
    longitude: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    openingDays: "",
    openingTime: "",
    closingTime: "",
  });
  const notificationAlertRef = React.useRef(null);
 
  console.log("select",selectSection.value)
   
  const [selectedDays, setSelectedDays] = useState([]);
  console.log(selectedDays)
  const toggleDaySelection = (index) => {
    if (selectedDays.includes(index+1)) {
      setSelectedDays(selectedDays.filter((d) => d !== index+1));
      console.log("sss", selectedDays);
    } else {
      setSelectedDays([...selectedDays, index+1]);
    }
  };

 
  const resetForm = () => {
    setStoreData({
      storeImage: "",
      storeName: "",
      storeDesc: "",
      address: "",
      latitude: "",
      longitude: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
      openingDays: "",
      openingTime: "",
      closingTime: "",
      selectedDays: "",
    });
    setImage(null);
  };
    
  useEffect(()=>{
    if(storeData.pincode){
  const getCity = async()=>{
          try{
            const Result = await axios.get("https://api.postalpincode.in/pincode/"+storeData.pincode)
             const data = Result?.data[0]?.PostOffice
             console.log(data)
             if(data.length>=1){
             setStoreData((previous)=>{
               return{...previous,city:data[0]?.District}
             })
             setStoreData((previous)=>{
              return{...previous,country:data[0]?.Country}
            })
            setStoreData((previous)=>{
              return{...previous,state:data[0]?.State}
            })
           }}
          catch(error){
           console.log(error)
          }
       }
       getCity()
    }
    
  },[storeData.pincode])


  const handleSubmit = (event) => {
    event.preventDefault();
  
   const vendorid = vendortData.filter((ele)=>{
            return(ele.email==selectSection?.value)
   })
   
    const id = vendorid[0].id
    var data = new FormData();
     data.append("vendor_id",id)
     data.append("store_image",storeImage);
     data.append("lat",location.lat)
     data.append("long",location.lng)
    data.append("store_name", storeData.storeName);
    data.append("store_desc", storeData.storeDesc);
    data.append("lat", location.lat);
    data.append("long", location.lng);
    data.append("address", storeData.address);
    data.append("pincode", storeData.pincode);
    data.append("city", storeData.city);
    data.append("state", storeData.state);
    data.append("country", storeData.country);
    data.append("opening_days", selectedDays);
    data.append("opening_time", storeData.openingTime);
    data.append("closing_time", storeData.closingTime);
    console.log("updateStore", data);
    Http.PostAPI(process.env.REACT_APP_ADDSTORE, data, null)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setStore(res?.data?.data);
          getStore()
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
    setShowAddStore(false);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setStoreData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  const daysOfWeek = ["M", "T", "W", "Th", "F", "St", "S"];

  useEffect(()=>{
    const getVendorsData=()=>{
      Http.GetAPI(process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(), {page:3}, null)
    .then((res) => { 
      if (res?.data?.status) {
        setVendorData(res.data.data)
      } 
    })
    .catch((e) => {
      setIsLoading(false);
      notificationAlertRef.current.notificationAlert(
        ErrorNotify("Something went wrong")
      );
    });
  }
  getVendorsData()
  },[])
  
  useEffect(()=>{
    if(vendortData){
      console.log("hello")
       const Result =  vendortData.map((ele,index)=>{
          return { label: `${index+1})  ${ele.name} , ${ele.email}`, value: ele.email}
        })  
        setData(Result)   
    }
  },[vendortData])

  return (
    <>
    <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Modal show={showAddStore} onHide={() => setShowAddStore(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Stores</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddStore(false);
              setSelectedDays("");
              resetForm();
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
          <Form.Group>
              <Form.Label className="add-label">Store Address</Form.Label>
              <div style={{marginBottom:"20px"}}>     
              <GoogleAutocomplete/>
              </div>   
              <div>
          <GooglePlacesPicker/>
          </div>
            </Form.Group>
           
            <Form.Label className="add-label">Vendor Name</Form.Label>
            <div style={{width:"100%",marginTop:"5px"}}>
            <ReactSelect data={vendortData}
             setSelectSection={setSelectSection}
            />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Store Image</Form.Label>
              <Form.Control
                type="file"
                name="storeDesc"
                required
                onChange={(e) => {
                  setStoreImage(e.target.files[0])
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Store Name</Form.Label>
              <Form.Control
                name="storeName"
                onChange={(e) => {
                  handleInput(e);
                }}
                type="text"
                required
              ></Form.Control>
            </Form.Group>
             
            <Form.Group>
              <Form.Label className="add-label">Store Description</Form.Label>
              <Form.Control
                type="text"
                name="storeDesc"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pincode"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={storeData.city}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={storeData.state}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={storeData.country}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Opening Days</Form.Label>
              <br />
              {daysOfWeek.map((day,index) => {
                const isSelected = selectedDays.includes(index+1);
                return (
                  <div
                    key={day}
                    className={`week-days ${isSelected ? "selected" : ""}`}
                    name="selectedDays"
                    onClick={() => toggleDaySelection(index)}
                  >
                    {day}
                  </div>
                );
              })}
            </Form.Group>

            <div
              style={{
                display: "flex",
                flexDirectionL: "rows",
                marginTop: "20px",
                marginBottom: "right",
              }}
            >
              <Form.Group style={{ width: "50%" }}>
                <Form.Label className="add-label">Opening Time</Form.Label>
                <br />
                <input
                  type="time"
                  name="openingTime"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
              </Form.Group>
              <Form.Group style={{ width: "50%" }}>
                <Form.Label className="add-label">Closing Time</Form.Label>
                <br />
                <input
                  type="time"
                  name="closingTime"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
              </Form.Group>
            </div>

            <ButtonComponent
            buttontext="Add"
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddStore;
