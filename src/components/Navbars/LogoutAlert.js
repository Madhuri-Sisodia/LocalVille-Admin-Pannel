import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md";

import { Modal, Button } from "react-bootstrap";

const Logout = ({ showLogout, setShowLogout }) => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
    history.push("/login");
    setShowLogout(false);
  };
  return (
    <>
      <Modal
        className="modal-mini modal-primary"
        show={showLogout}
        onHide={() => setShowLogout(false)}
      >
        <Modal.Header className="justify-content-end border-0">
          <MdClose
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setShowLogout(false);
            }}
          />
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to Logout?</p>

          <div className="modal-footer">
            <Button className="btn-fill" variant="danger" onClick={logout}>
              Yes
            </Button>
            <Button
              className="btn-fill"
              type="button"
              variant="secondary"
              onClick={() => setShowLogout(false)}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Logout;
