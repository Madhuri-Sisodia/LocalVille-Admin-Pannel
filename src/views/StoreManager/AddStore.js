import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

const AddStore = ({ showAddStore, setShowAddStore, getStore }) => {
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
    });
    setImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData();

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
    data.append("opening_days", storeData.openingDays);
    data.append("opening_time", storeData.openingTime);
    data.append("closing_time", storeData.closingTime);
    console.log("updateStore", data);

    Http.PostAPI(apis.addStore, data, null)
    .then((res) => {
      console.log("resp", res);
      if (res?.data?.status) {
        setStore(res?.data?.data);
        getStore();
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
    setStoreData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <Modal show={showAddStore} onHide={() => setShowAddStore(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Stores</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddStore(false);
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
              <Form.Control
                type="text"
                name="openingDays"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Opening Time</Form.Label>
              <Form.Control
                type="text"
                name="openingTime"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="add-label">Closing Time</Form.Label>
              <Form.Control
                type="text"
                name="closingTime"
                required
                onChange={(e) => {
                  handleInput(e);
                }}
              ></Form.Control>
            </Form.Group>
            <br></br>

            <Button className="btn-fill" variant="primary" type="submit" block>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddStore;
