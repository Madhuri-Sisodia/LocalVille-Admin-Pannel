import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import {Modal, Form, Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col } from "react-bootstrap";

const VerifiedStore = ({
  showVerifiedStore,
  setShowVerifiedStore,
  store,
  getUnverifiedStore,
}) => {
  const [updateStore, setUpdateStore] = useState([]);

  const handleUpdateStore = (store) => {
    var data = new FormData();
    data.append("store_id", store.id);
    data.append("verified_status", store.is_verified);
    Http.PostAPI(apis.updateVerifiedStore, data, null)
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
        show={showVerifiedStore}
        onHide={() => setShowVerifiedStore(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="modal-profile">
            <BiBlock
              style={{
                fontSize: "30px",
                color: "gray",
              }}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to verify this store?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleUpdateStore(store);
              setShowVerifiedStore(false);
            }}
          >
            Verify
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="secondary"
            onClick={() => setShowVerifiedStore(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default VerifiedStore;