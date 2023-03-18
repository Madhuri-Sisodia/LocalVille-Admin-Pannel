import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

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
const notificationAlertRef = React.useRef(null);
const BlockVendor = ({ showModal, setShowModal, blockData, getVendors }) => {
  const [blockUser, setBlockUser] = useState([]);
  const [blockReason, setBlockReason] = useState("");

  const handleBlockUser = (id) => {
    var data = new FormData();
    data.append("id", id);
    data.append("reason", blockReason);
    console.log("usersss", data);
    Http.PostAPI(process.env.REACT_APP_BLOCKUSER, data, null)
      .then((res) => {
        console.log("user", res);
        if (res?.data?.status) {
          setBlockUser(res?.data?.data);
          getVendors();
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
          <p>Are you sure you want to block this vendor?</p>
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
              handleBlockUser(blockData);
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
export default BlockVendor;
