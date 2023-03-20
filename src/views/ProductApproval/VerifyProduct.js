import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";

import {
  Modal,
  Form,
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const VerifyProduct = ({
  showVerifiedProduct,
  setShowVerifiedProduct,
  product,
  getUnverifiedProduct,
}) => {
  const [updateProduct, setUpdateProduct] = useState([]);

  const handleUpdateProduct = (product) => {
    var data = new FormData();
    data.append("product_id", product.id);
    data.append("verified_status", 1);
    Http.PostAPI(process.env.REACT_APP_UPDATEVERIFIEDPRODUCT, data, null)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setUpdateProduct(res?.data?.data);
          getUnverifiedProduct();
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
      <Modal
        className="modal-mini modal-primary"
        show={showVerifiedProduct}
        onHide={() => setShowVerifiedProduct(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
          <i className="nc-icon nc-check-2"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to verify this product?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleUpdateProduct(product);
              setShowVerifiedProduct(false);
            }}
          >
            Verify
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => setShowVerifiedProduct(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default VerifyProduct;
