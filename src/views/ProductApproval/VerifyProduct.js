import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";
import NotificationAlert from "react-notification-alert";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { SuccessNotify } from "components/NotificationShowPopUp";
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
  const notificationAlertRef = React.useRef(null);
// console.log("FEEEE",getUnverifiedProduct);
  const handleUpdateProduct = (product) => {
    var data = new FormData();
    data.append("product_id", product.id);
    data.append("verified_status", 1);
    Http.PostAPI(process.env.REACT_APP_UPDATEVERIFIEDPRODUCT, data, null)
      .then((res) => {
        console.log("AAA",res)
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
