import React, { useState, useRef } from "react";
import { Http } from "../../config/Service";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import NotificationAlert from "react-notification-alert";
import ErrorMessage from "customComponents/ErrorMessage";
import { Modal, Form, Badge, Button } from "react-bootstrap";

const DeleteAttribute = ({ showModal, setShowModal, item, getProducts }) => {
  const [deleteData, setDeleteData] = useState([]);
  const notificationAlertRef = useRef(null);

  const deleteAttribute = () => {
  
    var data = new FormData();

    data.append(`product_id`, item?.attributes?.[0]?.pid);
    data.append(`attr_id`, item?.attributes?.[0]?.id);

    Http.PostAPI(process.env.REACT_APP_DELETEATTRIBUTE, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setDeleteData(res?.data?.data);
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
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header className="justify-content-center">
        <div className="modal-profile">
            <i className="nc-icon nc-simple-remove"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to delete this attribute?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              deleteAttribute();
              setShowModal(false);
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default DeleteAttribute;
