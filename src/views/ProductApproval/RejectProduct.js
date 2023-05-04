import React, { useState } from "react";
import { Http } from "../../config/Service";
import NotificationAlert from "react-notification-alert";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { SuccessNotify } from "components/NotificationShowPopUp";
import ErrorMessage from "customComponents/ErrorMessage";

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
  const [errorMassage, setErrorMassage] = useState("");
  const notificationAlertRef = React.useRef(null);

  const handleRejectProduct = (product) => {
    var data = new FormData();
    data.append("product_id", product.id);
    data.append("verified_status", 2);
    data.append("reason", rejectReason);
    Http.PostAPI(process.env.REACT_APP_UPDATEVERIFIEDPRODUCT, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setUpdateProduct(res?.data?.data);
          getUnverifiedProduct();
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
          ErrorNotify("Something Went Wrong")
        );
      });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
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
            as="textarea"
            rows={3}
            placeholder="Enter Reason Here"
            maxLength={200}
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
            required
          />
          {errorMassage && <ErrorMessage message={errorMassage} />}
        </Modal.Body>

        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              if (rejectReason.trim().length === 0) {
                setErrorMassage("Reason is required.");
              } else {
                handleRejectProduct(product);
                setShowRejectProduct(false);
                setErrorMassage("");
                setRejectReason("");
              }
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
              setErrorMassage("");
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
