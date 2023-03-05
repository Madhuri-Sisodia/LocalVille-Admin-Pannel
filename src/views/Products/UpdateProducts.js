import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

const UpdateProducts = ({ showUpdateModal, setShowUpdateModal, item, getProducts }) => {
  // console.log("item", item)
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [hideId, setHideId] = useState(true);
  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productBuy, setProductBuy] = useState();
  const [productPickup, setProductPickup] = useState();


  const handleUpdateProducts = () => {

    var data = new FormData();
    // console.log(item.phone);
    data.append("pid", productId ? productId : item.id);
    data.append("product_name", productName ? productName : item.name);
    data.append("product_desc", productDescription ? productDescription : item.description);
    data.append("is_buy", productBuy ? productBuy : item.buy);
    data.append("is_pickup", productPickup ? productPickup : item.pickup);

    console.log("updateProducts", data);

    Http.PostAPI(apis.updateProducts, data, null)
      .then((res) => {
        console.log("data", res);
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
  };

  return (
    <>
      {item != null && (
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header>
            <Modal.Title className="update-title">Update Products</Modal.Title>
            <MdClose
              className="update-close-icon"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            />
          </Modal.Header>
          <Modal.Body className="update-body">
            <Form>
              {!hideId && <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                <label className="update-label">Product ID</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.id}
                  name="productId"
                  onChange={(value) => setProductId(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>}

              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Product Name</label>

                <Form.Control
                  className="update-form"
                  defaultValue={item?.name}
                  name="productName"
                  onChange={(value) => setProductName(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Product Description</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.description}
                  name="productDescription"
                  onChange={(value) => setProductDescription(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Product buy</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.buy}
                  name="productBuy"
                  onChange={(value) => setProductBuy(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Product pickup</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.pickup}
                  name="productPickup"
                  onChange={(value) => setProductPickup(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>

              <br></br>
              <Button
                className="btn-fill"
                appearance="primary"
                type="submit"
                block
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateProducts();
                  setShowUpdateModal(false);
                }}
              >
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateProducts;
