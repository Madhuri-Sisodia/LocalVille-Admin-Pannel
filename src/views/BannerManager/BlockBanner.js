import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";

import { ErrorNotify } from "components/NotificationShowPopUp";
import NotificationAlert from "react-notification-alert";

import { Modal, Form, Badge, Button } from "react-bootstrap";
const BlockBanner = ({ showModal, setShowModal, blockData, getBanner }) => {
  const [blockBanner, setBlockBanner] = useState([]);
  const [blockReason, setBlockReason] = useState("");
  const notificationAlertRef = React.useRef(null);

  const handleBlockBanner = (id) => {
    var data = new FormData();
    data.append("banner_id", id);
    data.append("reason", blockReason);

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
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
            <BiBlock
              style={{
                fontSize: "30px",
                marginBottom: "14px",
                color: "gray",
              }}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to block this banner?</p>
          <Form.Control
            componentClass="textarea"
            rows={3}
            style={{ fontSize: "0.9rem", height: "70px" }}
            placeholder="Enter Reason"
            maxLength={200}
            value={blockReason}
            onChange={(event) => setBlockReason(event.target.value)}
          />
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
            Block
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => {
              setShowModal(false);
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
export default BlockBanner;
