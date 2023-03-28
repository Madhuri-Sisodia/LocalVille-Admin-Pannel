import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const UpdateVendor = ({
  showUpdateModal,
  setShowUpdateModal,
  item,
  getVendors,
}) => {
  const [vendors, setVendors] = useState([]);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [hideId, setHideId] = useState(true);
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorImage, setVendorImage] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const notificationAlertRef = React.useRef(null);

  const updateImage = () => {
    const data = new FormData();
    data.append("vendor_id", vendorId ? vendorId : item.id);
    data.append("Vendor_name", vendorName ? vendorName : item.name);
    data.append("Vendor_image", vendorImage);
    console.log("vvv", vendorImage);

    Http.PostAPI(process.env.REACT_APP_UPDATEVENDORIMAGE, data, null)
      .then((res) => {
        console.log("imageresp", res);
        if (res?.data?.status) {
          setVendors(res?.data?.data);
          getVendors();
          } 
        })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };

  const handleUpdateVendor = (event) => {
    event.preventDefault();
    if (validate()) {
      updateImage();
      var data = new FormData();
      data.append("vendor_id", vendorId ? vendorId : item.id);
      data.append("v_name", vendorName ? vendorName : item.name);
      data.append("phone_number", vendorPhone ? vendorPhone : item.phone);

      Http.PostAPI(process.env.REACT_APP_UPDATEVENDORS, data, null)
        .then((res) => {
          console.log("resp", res);
          if (res?.data?.status) {
            setVendors(res?.data?.data);
            getVendors();
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
      setShowUpdateModal(false);
      setErrors("");
    }
  };

  const validate = () => {
    let tempErrors = {};

    // if (!vendorEmail) {
    //   tempErrors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(vendorEmail)) {
    //   tempErrors.email = "Email is invalid";
    // }
    // if (!image) {
    //   tempErrors.image = "Image is required";
    // } else if (
    //   image.type !== "image/png" &&
    //   image.type !== "image/jpg" &&
    //   image.type !== "image/jpeg"
    // ) {
    //   tempErrors.image = "Please select a valid image file (png, jpg, jpeg)";
    // }
    if (!/^\d{10}$/.test(vendorPhone)) {
      tempErrors.vendorPhone = "Phone number must be 10 digits";
    }
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
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
            <Form onSubmit={handleUpdateVendor}>
              {!hideId && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <label className="update-label">Vendor ID</label>
                  <Form.Control
                    className="update-form"
                    defaultValue={item?.id}
                    name="vendorId"
                    onChange={(value) => setVendorId(value)}
                    type="text"
                  ></Form.Control>
                </Form.Group>
              )}

              <Form.Group controlId="vendorName">
                <Form.Label className="update-label">Vendor Image</Form.Label>
                <div>
                  <img
                    src={vendorImage ? vendorImage : item?.user_image}
                    alt="image"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <Form.Control
                  className="update-form"
                  type="file"
                  name="vendorImage"
                  accept="image/*"
                  onChange={(e) => {
                    setVendorImage(e.target.files[0]);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="vendorName">
                <Form.Label className="update-label">Vendor Name</Form.Label>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="vendorName"
                  defaultValue={item?.name}
                  onChange={(e) => {
                    setVendorName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="vendorName">
                <Form.Label className="update-label">Vendor Phone</Form.Label>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="vendorPhone"
                  defaultValue={item?.phone}
                  onChange={(e) => {
                    setVendorPhone(e.target.value);
                  }}
                />
                {errors.vendorPhone && (
                  <Form.Text className="text-danger">
                    {errors.vendorPhone}
                  </Form.Text>
                )}
              </Form.Group>

              {/* <Form.Group controlId="vendorName">
              <Form.Label className="update-label">Vendor Email</Form.Label>
              <Form.Control
               className="update-form"
                type="text"
                name="vendorPhone"
                defaultValue={item?.email}
                onChange={(e) => {
                  setVendorEmail(e.target.value);
                }}
              />
               </Form.Group> */}

              <br></br>

              <ButtonComponent buttontext="Update" />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateVendor;
