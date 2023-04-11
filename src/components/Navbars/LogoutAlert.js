import React, { useState } from "react";

import {Modal } from "react-bootstrap";

const Logout = ({showLogout,setShowLogout}) => {


  return (
    <>
      <Modal
        className="modal-mini modal-primary"
        show={showLogout}
        onHide={() => setShowLogout(false)}
      >
         <Modal.Header className="justify-content-center">
          <div className="modal-profile">
          <i className="nc-icon nc-check-2"></i>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>LogOut Successfully...</p>
        </Modal.Body>
       
      </Modal>
    </>
  );
};
export default Logout;