import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../config/Service";
import { apis } from "../config/WebConstant";
import "../assets/css/updateModel.css";

const UpdateStore = ({ showUpdateStore, setShowUpdateStore, item }) => {
  {console.log("item", item)}

  const [storeData, setStoreData] = useState({
    storeId: "",
    storeName: "",
    storeDesc: "",
    address: "",
    latitude: "",
    longitude: "",
    pincode: "",
    city:"",
    state:"",
    country:"",
    openingDays:"",
    openingTime:"",
    closingTime:""
  });



  const handleUpdateVendor = () => {
    var data = new FormData();
    data.append("store_id", vendorId);
    data.append("v_name", vendorName);
    data.append("phone_number", vendorPhone);
    console.log("updateVendors", data);
    Http.PostAPI(apis.updateVendors, data, null)
      .then((res) => {
        console.log("data", res);
        if (res?.data?.status) {
          setVendors(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  return (
    <>
      
      {item!=null &&
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
      <Modal.Header>
        <Modal.Title className="title">Update Vendors</Modal.Title>
        <MdClose
          className="close-icon"
          onClick={() => {
            setShowUpdateModal(false);
         
          }}
        />
      </Modal.Header>
      <Modal.Body className="body">
        <Form>
          <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
            <label className="label">Store ID</label>
            <Form.Control
              className="form"
              defaultValue={item?.id}
              name="vendorId"
              onChange={(value) => setVendorId(value.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginBottom: "1rem" }}>
            <label className="label">Store Name</label>
            <Form.Control
              className="form"
              defaultValue={item?.name}
              name="vendorName"
              onChange={(value) => setVendorName(value.target.value)}
              type="text"
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <label className="label">Store Description</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <label className="label">Address</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">Pincode</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">City</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">State</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">Country</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">Opening Days</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">Opening Time</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <label className="label">Closing Time</label>
            <Form.Control
              className="form"
              defaultValue={item?.phone}
              type="number"
              name="vendorPhone"
              onChange={(value) => setVendorPhone(value.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <br></br>
          <Button
            className="btn-fill"
            appearance="primary"
            type="submit"
            block
            onClick={() => {
              handleUpdateVendor();
              setShowUpdateModal(false);
            }}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    }
    </>
  );
};
export default UpdateStore;
