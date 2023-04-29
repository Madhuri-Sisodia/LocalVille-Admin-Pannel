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
  const [blockReason, setBlockReason] = useState("");
  const [errorMassage, setErrorMassage] = useState("");

  const notificationAlertRef = React.useRef(null);

  const handleBlockUser = (id) => {
    console.log("hellooo")
    var data = new FormData();
    data.append("vendor_id", id);
    data.append("status", 1);
    data.append("reason", blockReason);
   
    Http.PostAPI(process.env.REACT_APP_BLOCKUSER, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setBlockUser(res?.data?.data);
          getVendors();
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
        } else {
          setErrorMassage(res?.data?.message);
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
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Reason Here"
            maxLength={200}
            value={blockReason}
            onChange={(event) => setBlockReason(event.target.value)}
          />
          {errorMassage && <ErrorMessage message={errorMassage} />}
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
                if (blockReason.trim().length === 0) {
                  setErrorMassage("Reason is required.");
                } else {
                  handleBlockUser(blockData);
                  setShowActiveModal(false);
                  setErrorMassage("");
                }
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
              setErrorMassage("");
              setBlockReason("");
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
