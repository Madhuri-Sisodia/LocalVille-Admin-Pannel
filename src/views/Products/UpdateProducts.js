import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

const UpdateProducts = ({ showUpdateModal, setShowUpdateModal, item,getProducts }) => {
  // console.log("item", item)
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [hideId, setHideId] = useState(true);
  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState();
//   const [productPhone, setproductPhone] = useState();
 

  const handleUpdateProducts = () => {
    // console.log("Vn",productName);
    // console.log("VI",productId);
    // console.log("VP",productPhone);
    var data = new FormData();
    // console.log(item.phone);
    data.append("product_id", productId ? productId : item.id);
    data.append("v_name", productName ? productName : item.name);
    // data.append("phone_number", productPhone ? productPhone : item.phone);

    console.log("updateProduct", data);

    Http.PostAPI(apis.updateProduct, data, null)
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
              {!hideId &&<Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                <label className="update-label">product ID</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.id}
                  name="productId"
                  onChange={(value) => setProductId(value.target.value)}
                  type="text"
                ></Form.Control>
              </Form.Group>}

              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">product Name</label>

                <Form.Control
                  className="update-form"
                  defaultValue={item?.name}
                  name="productName"
                  onChange={(value) => setProductName(value.target.value)}
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
