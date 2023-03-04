import React, { useState } from "react";
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

const RejectProduct = ({
  showRejectProduct,
  setShowRejectProduct,
  product,
  getUnverifiedProduct,
}) => {
  const [updateProduct, setUpdateProduct] = useState([]);
  const [rejectReason, setRejectReason] = useState("");

  const handleRejectProduct = (product) => {
    var data = new FormData();
    data.append("product_id", product.id);
    data.append("verified_status", 2);
    Http.PostAPI(apis.updateVerifiedProduct, data, null)
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
        show={showRejectProduct}
        onHide={() => setShowRejectProduct(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
            <i className="nc-icon nc-simple-remove"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to reject this product?</p>
          <Form.Control
            componentClass="textarea"
            rows={3}
            style={{ fontSize: "0.9rem" }}
            placeholder="Enter Reason"
            maxLength={200}
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
          />
        </Modal.Body>

        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleRejectProduct(product);
              setShowRejectProduct(false);
            }}
          >
            Reject
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => {
              setShowRejectProduct(false);
              setRejectReason("");
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default RejectProduct;
