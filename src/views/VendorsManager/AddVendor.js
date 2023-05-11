import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import ReactSelect from "CommonUtils/React-Select";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

const AddVendor = ({ showAddVendor, setShowAddVendor, getVendors }) => {
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  const [btnLoading, setBtnloading] =useState (false);
   const [errorMessage, setErrorMessage] = useState("");
  const [vendorData, setVendorData] = useState({
    vendorImage: null,
    vendorName: "",
    email: "",
    phone: "",
  });
  const notificationAlertRef = React.useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("hello", file);
    setImageFile(file);
    setErrorMessage(null);
  };
  

  const resetForm = () => {
    setVendorData({
      vendorImage: null,
      vendorName: "",
      email: "",
      phone: "",
    });
    setImageFile("");
  };

  const validate = () => {
    let tempErrors = {};

    if (!vendorData.vendorName) {
      tempErrors.vendorName = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(vendorData.vendorName)) {
      tempErrors.vendorName = "Name should contain only alphabets";
    }
    if (!vendorData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(vendorData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!imageFile) {
      tempErrors.imageFile = "Image is required";
    } else if (
      imageFile.type !== "image/png" &&
      imageFile.type !== "image/jpg" &&
      imageFile.type !== "image/jpeg"
    ) {
      tempErrors.imageFile =
        "Please select a valid image file (png, jpg, jpeg)";
    }
    if (!vendorData.phone) {
      tempErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(vendorData.phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      var data = new FormData();
      data.append("user_image", imageFile);
      data.append("name", vendorData.vendorName);
      data.append("email", vendorData.email);
      data.append("phonenumber", vendorData.phone);
      setBtnloading(true);

      Http.PostAPI(process.env.REACT_APP_ADDVENDORS, data)
        .then((res) => {
          setBtnloading(false);
          console.log("addd", res);
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
          setBtnloading(false);
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });
      resetForm();
      setShowAddVendor(false);
    }
  };

  const handleInput = (e) => {
    setVendorData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Modal show={showAddVendor} onHide={() => setShowAddVendor(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Vendors</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddVendor(false);
              resetForm();
              setErrors("");
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group controlId="vendorImage">
              <Form.Label className="add-label">Vendor Image</Form.Label>
              <Form.Control
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {errors.image && (
                <Form.Text className="text-danger">{errors.image}</Form.Text>
              )}
            </Form.Group> */}
            <Form.Group>
              <Form.Label htmlFor="file" className="add-label">
                VendorImage
              </Form.Label>
            
               
              <div>
                {imageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Avatar"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "11px",
                      }}
                    />

                    {/* <div style={{ marginTop: "1em" }}>
                      <button onClick={handleRemoveImage}>Remove Image</button>
                    </div> */}
                  </div>
                ) : (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor="avatar-upload">
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          border: "1px dotted",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CameraRetroIcon style={{ fontSize: "64px" }} />
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </Form.Group>

            <Form.Group controlId="vendorName">
              <Form.Label className="add-label">Vendor Name</Form.Label>
              <Form.Control
                type="text"
                name="vendorName"
                placeholder="Enter vendor name"
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              {errors.vendorName && (
                <Form.Text className="text-danger">
                  {errors.vendorName}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="add-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label className="add-label">Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter phone"
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              {errors.phone && (
                <Form.Text className="text-danger">{errors.phone}</Form.Text>
              )}
            </Form.Group>

            <ButtonComponent buttontext="Add" 
            btnLoading={btnLoading}
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddVendor;
