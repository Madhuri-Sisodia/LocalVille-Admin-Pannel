import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";
import usevendorData from "CommonUtils/CostomeComp";

const AddStore = ({ showAddStore, setShowAddStore, getStore,addStore }) => {
  const [store, setStore] = useState([]);
  const [image, setImage] = useState(null);

  const [storeData, setStoreData] = useState({
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
  });

  console.log(storeData);
  const [selectedDays, setSelectedDays] = useState([]);

  console.log(selectedDays);

  const toggleDaySelection = (day) => {
    console.log("sss", selectedDays);
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      console.log("sss", selectedDays);
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setStoreData((previous) => {
      return { ...previous, storeImage: file };
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();

   const vendorid = vendortData.filter((ele)=>{
            return(ele.email==selectSection)
   })
     
   console.log(vendorid)
    const id = vendorid[0].id
    console.log(id)
    var data = new FormData();
     data.append("vendor_id",id)
    data.append("store_Image", storeData.storeImage);
    data.append("store_name", storeData.storeName);
    data.append("store_desc", storeData.storeDesc);
    data.append("lat", storeData.latitude);
    data.append("long", storeData.longitude);
    data.append("address", storeData.address);
    data.append("pincode", storeData.pincode);
    data.append("city", storeData.city);
    data.append("state", storeData.state);
    data.append("country", storeData.country);
    data.append("opening_days", selectedDays);
    data.append("opening_time", storeData.openingTime);
    data.append("closing_time", storeData.closingTime);
    console.log("updateStore", data);

    Http.PostAPI(apis.addStore, data, null)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setStore(res?.data?.data);
          addStore(true)
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
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
      Http.GetAPI(apis.getVendorsData + "?" + Math.random(), "", null)
    .then((res) => { 
      if (res?.data?.status) {
        console.log("vendorData=>",res.data.data)
        setVendorData(res.data.data)
      } else {
        alert("Fields not matched");
      }
    })
    .catch((e) => {
      setIsLoading(false);
      alert("Something went wrong.");
      console.log("Error:", e);
    });
  }
  getVendorsData()
  },[])
 

  return (
    <>
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
            {/* <Form.Group>
              <Form.Label className="add-label">Store Image</Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
                required
              />
            </Form.Group> */}

            {/* <Form.Group >
                  <Form.Label className="add-label">Longitude</Form.Label>
                  <Form.Control
                   
                    
                    name="storeId"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    type="number"
                     required
                  ></Form.Control>
                </Form.Group>
              

         
                <Form.Group >
                  <Form.Label className="add-label">Latitude</Form.Label>
                  <Form.Control
                    
                    
                    name="storeId"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    type="number"
                     required
                  ></Form.Control>
                </Form.Group>
               */}

            <Form.Group>
            <Form.Label className="add-label">Store Name</Form.Label>
            
            <div style={{width:"50%",marginTop:"5px"}}>
              <select
                name="selectSection"
                value={selectSection}
               onChange={(event) => setSelectSection(event.target.value)}
                style={{height:"35px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020",width:"80%"}}  
               >
                <option value="">Select</option>
                {vendortData.map((category) => (
                  <option key={category.id} value={category.email}>
                    {category.email}
                  </option>
                ))}
              </select>
              </div>
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
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Opening Days</Form.Label>
              <br />
              {daysOfWeek.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <div
                    key={day}
                    className={`week-days ${isSelected ? "selected" : ""}`}
                    name="selectedDays"
                    onClick={() => toggleDaySelection(day)}
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

            <br></br>
            <button
              type="submit"
              block
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
export default AddStore;
