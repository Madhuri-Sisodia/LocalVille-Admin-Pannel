import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Form } from "rsuite";
import { FaCamera } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { validationUpdateModel } from "components/Validation";

const UpdateVendor = ({
  showUpdateModal,
  setShowUpdateModal,
  item,
  getVendors,
}) => {
  const [vendors, setVendors] = useState([]);
  const [hideId, setHideId] = useState(true);
  const [vendorImage, setVendorImage] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [formValue, setFormValue] = useState({
    vendorId: item?.id,
    vendorName: item?.name,
    vendorPhone: item?.phone,
  });

  const notificationAlertRef = React.useRef(null);
  const formRef = React.useRef();

  const updateImage = () => {
    const data = new FormData();
    data.append(
      "vendor_id",
      formValue.vendorId ? formValue.vendorId : item?.id
    );
    data.append(
      "Vendor_name",
      formValue.vendorName ? formValue.vendorName : item?.name
    );
    data.append("Vendor_image", vendorImage);
    console.log("Image", vendorImage);

    Http.PostAPI(process.env.REACT_APP_UPDATEVENDORIMAGE, data, null)
      .then((res) => {
        console.log("imageresp", res);
        if (res?.data?.status) {
          setVendors(res?.data?.data);
          getVendors();
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
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

    setShowUpdateModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setVendorImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBaseImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    updateImage();
  }, [baseImage, vendorImage]);

  const handleUpdateVendor = (event) => {
    // event.preventDefault();

    if (!formRef.current.check()) {
      console.log("FORM ERROR!");

      return;
    } else {
      console.log("formValue:", formValue);
      var data = new FormData();
      data.append(
        "vendor_id",
        formValue.vendorId ? formValue.vendorId : item?.id
      );
      data.append(
        "v_name",
        formValue.vendorName ? formValue.vendorName : item?.name
      );
      data.append(
        "phone_number",
        formValue.vendorPhone ? formValue.vendorPhone : item?.phone
      );

      Http.PostAPI(process.env.REACT_APP_UPDATEVENDORS, data, null)
        .then((res) => {
          console.log("resp", res);
          if (res?.data?.status) {
            setVendors(res?.data?.data);
            getVendors();
            notificationAlertRef.current.notificationAlert(
              SuccessNotify(res?.data?.message)
            );
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
      // setFormValue({
      //   vendorId: "",
      //   vendorName: "",
      //   vendorPhone: "",
      // });
      setShowUpdateModal(false);
    }
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {item != null && (
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header>
            <Modal.Title className="titleUpdateProduct">
              Update Vendors
            </Modal.Title>
            <MdClose
              className="update-close-icon"
              onClick={() => {
                setShowUpdateModal(false);
              }}
            />
          </Modal.Header>
          <Modal.Body className="add-body updateProductModel">
            <Form
              fluid
              ref={formRef}
              formValue={formValue}
              onSubmit={handleUpdateVendor}
              onChange={setFormValue}
              model={validationUpdateModel}
            >
              {!hideId && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <label className="update-label">Vendor ID</label>
                  <Form.ControlLabel
                    name="vendorId"
                    defaultValue={
                      formValue.vendorId ? formValue.vendorId : item?.vendorId
                    }
                    type="Id"
                  ></Form.ControlLabel>
                </Form.Group>
              )}

              <Form.Group className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct">
                  {" "}
                  Update Vendor
                </Form.ControlLabel>

                <img
                  src={vendorImage ? baseImage : item?.user_image}
                  alt="Image"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <div style={{ display: "flex", alignItems: "left" }}>
                  <label htmlFor="vendorImage">
                    <div style={{ position: "relative" }}>
                      <FaCamera
                        style={{
                          fontSize: "15px",
                          cursor: "pointer",
                          color: "blueviolet",
                        }}
                      />
                      <input
                        id="vendorImage"
                        type="file"
                        name="vendorImage"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>
                  </label>
                  <span
                    style={{
                      margin: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Upload Image
                  </span>
                </div>
              </Form.Group>

              <Form.Group className="UpdateProductForm">
                <Form.ControlLabel className="add-label-UpdateProduct">
                  {" "}
                  Update Vendor
                </Form.ControlLabel>

                <Form.Group>
                  <Form.ControlLabel>Vendor Name</Form.ControlLabel>
                  <Form.Control
                    style={{ width: "100%" }}
                    type="text"
                    name="vendorName"
                    defaultValue={
                      formValue.vendorName ? formValue.vendorName : item?.name
                    }
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel>Vendor Phone</Form.ControlLabel>
                  <Form.Control
                    style={{ width: "100%" }}
                    type="text"
                    name="vendorPhone"
                    defaultValue={
                      formValue.vendorPhone
                        ? formValue.vendorPhone
                        : item?.phone
                    }
                  />
                </Form.Group>

                <ButtonComponent buttontext="Update Product" />
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateVendor;
