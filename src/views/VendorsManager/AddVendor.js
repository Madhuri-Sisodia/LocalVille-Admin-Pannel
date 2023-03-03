import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

const AddVendor = ({ showAddVendor, setShowAddVendor, getVendors }) => {
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [vendorData, setVendorData] = useState({
    vendorImage: null,
    vendorName: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setVendorData((previous) => {
      return { ...previous, vendorImage: file };
    });
  };

  const resetForm = () => {
    setVendorData({
      vendorImage: null,
      vendorName: "",
      email: "",
      phone: "",
    });
    setImage(null);
  };

  const validate = () => {
    let tempErrors = {};

    if (!vendorData.vendorName) {
      tempErrors.vendorName = "Name is required";
    }
    if (!vendorData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(vendorData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!vendorData.vendorImage) {
      tempErrors.vendorImage = "Image is required";
    } else if (
      vendorData.vendorImage.type !== "image/png" &&
      vendorData.vendorImage.type !== "image/jpg" &&
      vendorData.vendorImage.type !== "image/jpeg"
    ) {
      tempErrors.vendorImage =
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
      console.log(vendorData);

      var data = new FormData();

      data.append("name", vendorData.vendorName);
      data.append("email", vendorData.email);
      data.append("phonenumber", vendorData.phone);
      // data.append("image", vendorData.vendorImage);
      console.log("dddd", data);

      Http.PostAPI(apis.addVendors, data, null)
        .then((res) => {
          console.log("resp", res);
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
            <Form.Group controlId="vendorImage">
              <Form.Label className="add-label">Vendor Image</Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />

              {errors.vendorImage && (
                <Form.Text className="text-danger">
                  {errors.vendorImage}
                </Form.Text>
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
export default AddVendor;
