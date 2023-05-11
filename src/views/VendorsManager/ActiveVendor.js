import React, { useState } from "react";

import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import ErrorMessage from "customComponents/ErrorMessage";

// import {TfiReload } from "react-icons/bi";
import { Http } from "../../config/Service";

import { Modal, Form, Badge, Button } from "react-bootstrap";
const ActiveVendor = ({
  showActiveModal,
  setShowActiveModal,
  blockData,
  getVendors,
}) => {
  const [blockUser, setBlockUser] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const handleBlockUser = (id) => {
    var data = new FormData();
    data.append("vendor_id", id);
    data.append("status", 1);

    Http.PostAPI(process.env.REACT_APP_BLOCKUSER, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setBlockUser(res?.data?.data);
          getVendors();
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
          <p>Are you sure you want to active this vendor?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleBlockUser(blockData);
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
export default ActiveVendor;
