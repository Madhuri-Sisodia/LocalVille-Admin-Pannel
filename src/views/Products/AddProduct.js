import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

const AddProduct = ({ showAddProduct, setShowAddProduct, getProducts }) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductData((previous) => {
      return { ...previous, productImage: file };
    });
  };

  const resetForm = () => {
    setProductData({
      productImage: null,
      productName: "",
      email: "",
      phone: "",
    });
    setImage(null);
  };

  const validate = () => {
    let tempErrors = {};

    if (!productData.productName) {
      tempErrors.productName = "Name is required";
    }
    if (!productData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(productData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!productData.productImage) {
      tempErrors.productImage = "Image is required";
    } else if (
      productData.productImage.type !== "image/png" &&
      productData.productImage.type !== "image/jpg" &&
      productData.productImage.type !== "image/jpeg"
    ) {
      tempErrors.productImage =
        "please select a valid image file (png, jpg, jpeg)";
    }
    if (!productData.phone) {
      tempErrors.phone = "phone is required";
    } else if (!/^\d{10}$/.test(productData.phone)) {
      tempErrors.phone = "phone number must be 10 digits";
    }
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log(productData);

      var data = new FormData();

      data.append("name", productData.productName);
      data.append("email", productData.email);
      data.append("phonenumber", productData.phone);
      // data.append("image", productData.productImage);
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
            <Form.Group controlId="productImage">
              <Form.Label className="add-label">Product Image</Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />

              {errors.productImage && (
                <Form.Text className="text-danger">
                  {errors.productImage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="vendorName">
              <Form.Label className="add-label">product Name</Form.Label>
              <Form.Control
                type="text"
                name="vendorName"
                placeholder="Enter product name"
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              {errors.productName && (
                <Form.Text className="text-danger">
                  {errors.productName}
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
              <Form.Label className="add-label">phone</Form.Label>
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
