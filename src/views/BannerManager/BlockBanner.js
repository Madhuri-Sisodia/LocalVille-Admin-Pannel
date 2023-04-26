import React, { useState, useRef } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import NotificationAlert from "react-notification-alert";
import ErrorMessage from "customComponents/ErrorMessage";
import { Modal, Form, Badge, Button } from "react-bootstrap";


const BlockBanner = ({ showModal, setShowModal, blockData, getBanner }) => {
  const [blockBanner, setBlockBanner] = useState([]);
  const [blockReason, setBlockReason] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const notificationAlertRef = useRef(null);

  const handleBlockBanner = (id) => {
    var data = new FormData();
    data.append("banner_id", id);
    data.append("status", 0);
    data.append("reason", blockReason);

    Http.PostAPI(process.env.REACT_APP_BLOCKBANNER, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setBlockBanner(res?.data?.data);
          getBanner();
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
        } else {
          setErrorMassage(res?.data?.message);
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something Went Wrong")
        );
      });
    setBlockReason("");
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
                handleBlockBanner(blockData);
                setShowModal(false);
                setErrorMassage("");
              }
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
export default BlockBanner;
