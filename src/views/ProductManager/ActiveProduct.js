import React, { useState } from "react";
import { Http } from "../../config/Service";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
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

const ActiveProduct = ({
  showActiveModal,
  setShowActiveModal,
  blockData,
  getProducts,
}) => {
  const [blockStore, setBlockStore] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const handleBlockProducts = (id) => {
    var data = new FormData();
    data.append("product_id", id);
    data.append("status", 1);

    Http.PostAPI(process.env.REACT_APP_BLOCKPRODUCTS, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setBlockStore(res?.data?.data);
          getProducts();
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
          ErrorNotify("Something went wrong")
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
        show={showActiveModal}
        onHide={() => setShowActiveModal(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
            <i className="nc-icon nc-check-2"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to active this product?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleBlockProducts(blockData);
              setShowActiveModal(false);
            }}
          >
            Active
          </Button>

          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => {
              setShowActiveModal(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ActiveProduct;
