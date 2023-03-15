import React, { useState } from "react";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";

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

const RejectStore = ({
  showRejectStore,
  setShowRejectStore,
  store,
  getUnverifiedStore
}) => {
  const [updateStore, setUpdateStore] = useState([]);
  const [blockReason, setBlockReason] = useState("");
  const handleRejectStore = (store) => {
    var data = new FormData();
    data.append("store_id", store.id);
    data.append("verified_status", 2);
    data.append("ReajectReason",RejectReason)
    Http.PostAPI(process.env.REACT_APP_UPDATEVERIFIEDSTORE, data, null)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setUpdateStore(res?.data?.data);
          getUnverifiedStore();
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  return (
    <>
      <Modal
        className="modal-mini modal-primary"
        show={showRejectStore}
        // onHide={() => setShowRejectStore(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
            <i className="nc-icon nc-simple-remove"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to reject this store?</p>
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
              handleRejectStore(store);
              setShowRejectStore(false);
            }}
          >
            Reject
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => setShowRejectStore(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default RejectStore;