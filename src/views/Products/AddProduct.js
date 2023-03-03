import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

const AddProduct = ({ showAddProduct, setShowAddProduct, getProducts }) => {
  const [Products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [ProductData, setProductData] = useState({
    ProductImage: null,
    ProductName: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductData((previous) => {
      return { ...previous, ProductImage: file };
    });
  };

  const resetForm = () => {
    setProductData({
      ProductImage: null,
      ProductName: "",
      email: "",
      phone: "",
    });
    setImage(null);
  };

  const validate = () => {
    let tempErrors = {};

    if (!ProductData.ProductName) {
      tempErrors.ProductName = "Name is required";
    }
    if (!ProductData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(ProductData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!ProductData.ProductImage) {
      tempErrors.ProductImage = "Image is required";
    } else if (
      ProductData.ProductImage.type !== "image/png" &&
      ProductData.ProductImage.type !== "image/jpg" &&
      ProductData.ProductImage.type !== "image/jpeg"
    ) {
      tempErrors.ProductImage =
        "Please select a valid image file (png, jpg, jpeg)";
    }
    if (!ProductData.phone) {
      tempErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(ProductData.phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log(ProductData);

      var data = new FormData();

      data.append("name", ProductData.ProductName);
      data.append("email", ProductData.email);
      data.append("phonenumber", ProductData.phone);
      // data.append("image", ProductData.ProductImage);
      console.log("dddd", data);

      Http.PostAPI(apis.addProducts, data, null)
        .then((res) => {
          console.log("resp", res);
          if (res?.data?.status) {
            setProducts(res?.data?.data);
            getProducts();
          } else {
            alert("Fields not matched");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
        });
      resetForm();
      setShowAddProduct(false);
    }
  };

  const handleInput = (e) => {
    setProductData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <Modal show={showAddProduct} onHide={() => setShowAddProduct(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Products</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddProduct(false);
              resetForm();
              setErrors("");
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ProductImage">
              <Form.Label className="add-label">Product Image</Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />

              {errors.ProductImage && (
                <Form.Text className="text-danger">
                  {errors.ProductImage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="vendorName">
              <Form.Label className="add-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                name="vendorName"
                placeholder="Enter Product name"
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              {errors.ProductName && (
                <Form.Text className="text-danger">
                  {errors.ProductName}
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
export default AddProduct;
