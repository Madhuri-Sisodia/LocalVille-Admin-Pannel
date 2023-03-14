import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";

const UpdateVendor = ({ showUpdateModal, setShowUpdateModal, item,getVendors }) => {
  // console.log("item", item)
  const [vendors, setVendors] = useState([]);
  const [data, setData] = useState([]);
  const [hideId, setHideId] = useState(true);
  const [vendorId, setVendorId] = useState();
  const [vendorName, setVendorName] = useState();
  const [vendorPhone, setVendorPhone] = useState();
 

  const handleUpdateVendor = () => {
    // console.log("Vn",vendorName);
    // console.log("VI",vendorId);
    // console.log("VP",vendorPhone);
    var data = new FormData();
    console.log(item.phone);
    data.append("vendor_id", vendorId ? vendorId : item.id);
    data.append("v_name", vendorName ? vendorName : item.name);
    data.append("phone_number", vendorPhone ? vendorPhone : item.phone);

    console.log("updateVendors", data);

    Http.PostAPI(process.env.REACT_APP_UPDATEVENDORS, data, null)
      .then((res) => {
        console.log("data", res);
        if (res?.data?.status) {
          setVendors(res?.data?.data);
          getVendors();
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
      {item != null && (
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header>
            <Modal.Title className="update-title">Update Vendors</Modal.Title>
            <MdClose
              className="update-close-icon"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            />
          </Modal.Header>
          <Modal.Body className="update-body">
            <Form>
              {!hideId &&<Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                <label className="update-label">Vendor ID</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.id}
                  name="vendorId"
                  onChange={(value) => setVendorId(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>}

              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Vendor Name</label>

                <Form.Control
                  className="update-form"
                  defaultValue={item?.name}
                  name="vendorName"
                  onChange={(value) => setVendorName(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Phone</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.phone}
                  type="number"
                  name="vendorPhone"
                  onChange={(value) => setVendorPhone(value.target.value)}
                ></Form.Control>
              </Form.Group>
              <br></br>
            <ButtonComponent
            buttontext="Update"
            block
            onClick={(e) => {
              e.preventDefault();
              handleUpdateVendor();
              setShowUpdateModal(false);
            }}
            />
            </Form>
           
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateVendor;
