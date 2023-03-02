import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
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
const BlockStore = ({ showModal, setShowModal, blockData, getStore }) => {
  const [blockStore, setBlockStore] = useState([]);
  const [blockReason, setBlockReason] = useState("");
  
  const handleBlockStore = (id) => {
    var data = new FormData();
    data.append("id", id);
    console.log("usersss", data);
    Http.PostAPI(apis.blockStore, data, null)
      .then((res) => {
        console.log("user", res);
        if (res?.data?.status) {
          setBlockStore(res?.data?.data);
          getStore();
       
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
          <p>Are you sure you want to block this store?</p>
          <textarea
            style={{ fontSize: "0.9rem" }}
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
                handleBlockStore(blockData);
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
export default BlockStore;
