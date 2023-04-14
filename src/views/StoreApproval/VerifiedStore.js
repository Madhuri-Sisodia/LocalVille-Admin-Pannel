import React, { useState } from "react";
import { BiBlock } from "react-icons/bi";
import { Http } from "../../config/Service";
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
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
const VerifiedStore = ({
  showVerifiedStore,
  setShowVerifiedStore,
  store,
  getUnverifiedStore,
}) => {
  const [updateStore, setUpdateStore] = useState([]);
  const notificationAlertRef = React.useRef(null);

  const handleUpdateStore = (store) => {
    var data = new FormData();
    data.append("store_id", store.id);
    data.append("verified_status", 1);
    Http.PostAPI(process.env.REACT_APP_UPDATEVERIFIEDSTORE, data, null)
      .then((res) => {
        if (res?.data?.status) {
          setUpdateStore(res?.data?.data);
          getUnverifiedStore();
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
        } else {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify(res?.data?.message)
          );
          // alert("Fields not matched");
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
        // alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Modal
        className="modal-mini modal-primary"
        show={showVerifiedStore}
        // onHide={() => setShowVerifiedStore(false)}
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
