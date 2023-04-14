import React, { useState } from "react";
// import {TfiReload } from "react-icons/bi";
import { Http } from "../../config/Service";

import { ErrorNotify } from "components/NotificationShowPopUp";
import NotificationAlert from "react-notification-alert";

import { Modal, Form, Badge, Button } from "react-bootstrap";
const ActiveBanner = ({
  showActiveModal,
  setShowActiveModal,
  blockData,
  getBanner,
}) => {
  const [blockBanner, setBlockBanner] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const handleBlockBanner = (id) => {
    var data = new FormData();
    data.append("banner_id", id);
    data.append("status", 1);

    Http.PostAPI(process.env.REACT_APP_BLOCKBANNER, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setBlockBanner(res?.data?.data);
          getBanner();
        } else {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify(res?.data?.message)
          );
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify(res?.data?.message)
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
          <p>Are you sure you want to active this banner?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleBlockBanner(blockData);
              setShowModal(false);
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
export default ActiveBanner;
