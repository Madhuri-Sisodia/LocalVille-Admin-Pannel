import React, { useState, useEffect, useRef } from "react";
import { Http } from "../../config/Service";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

import { Form, Radio, RadioGroup, Button } from "rsuite";
import { Table, Card, Col } from "react-bootstrap";

import "../../assets/css/admin.css";
import BlockBanner from "./BlockBanner";
import ButtonComponent from "views/ButtonComponent";
import Loading from "customComponents/Loading";
import ActiveBanner from "./ActiveBanner";

import { Uploader, Message, Loader, useToaster } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
const BannerManager = () => {
  const [formData, setFormData] = useState({
    image: "",
    redirect: "",
    url: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [blockData, setBlockData] = useState([]);
  const [addBanner, setAddBanner] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const fileInputRef = useRef(null);
  // const toaster = useToaster();
  // const [uploading, setUploading] = React.useState(false);
  // const [fileInfo, setFileInfo] = React.useState(null);

  // const handleFileChange = (event) => {
  //   setImageUrl(event.target.files[0]);
  // };
  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    // setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setErrorMessage("image upload success");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000); // set timer for 2 seconds
    } else {
      setImageFile(null);
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setErrorMessage("");
  };
  const getBanner = () => {
    Http.GetAPI(process.env.REACT_APP_GETBANNER + "?" + Math.random(), data)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify(res?.data?.message)
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  const resetForm = () => {
    setFormData({
      image: "",
      redirect: "",
      url: "",
    });
    setImageFile("");
    // setImageUrl("");
  };

  const handleSubmit = () => {
    //  e.preventDefault();
    let redirectImg;
    if (formData.redirect == "Yes") {
      redirectImg = "1";
    } else {
      redirectImg = "0";
    }

    var data = new FormData();
    data.append("banner_image", imageFile);
    data.append("is_redirect", redirectImg);
    data.append("url", formData.url);
    data.append("active", 1);

    Http.PostAPI(process.env.REACT_APP_ADDBANNER, data)
      .then((res) => {
        if (res?.data?.status) {
          setAddBanner(res?.data?.data);
          getBanner();
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
          resetForm();
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

  const handleFieldChange = (e, name) => {
    setFormData((previous) => {
      return { ...previous, [name]: e };
    });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group>
              <Form.ControlLabel htmlFor="file">IMAGE</Form.ControlLabel>
              <div>
                {showNotification && errorMessage && (
                  <div style={{ color: "green" }}>{errorMessage}</div>
                )}
                {imageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Avatar"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "11px",
                      }}
                    />
                    <div style={{ marginTop: "1em" }}>
                      <button onClick={handleRemoveImage}>Remove Image</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor="avatar-upload">
                      <CameraRetroIcon />
                      <img
                        src="https://media.istockphoto.com/id/1409881908/photo/yellow-retro-camera-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=QTEBd6s2FwD3elJ9dPg3XFwWrk6FcpT1o0WdmeRMzhg="
                        alt="Avatar Placeholder"
                        style={{
                          borderRadius: "11px",
                          width: "90px",
                        }}
                      />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              {/* <input
                type="file"
                name="imageUrl"
                required
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
              /> */}
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>IMAGE REDIRECTION</Form.ControlLabel>
              <RadioGroup
                name="redirect"
                inline
                onChange={(e) => handleFieldChange(e, "redirect")}
                required
              >
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </RadioGroup>
            </Form.Group>

            {formData.redirect == "1" && (
              <Form.Group>
                <Form.ControlLabel>URL</Form.ControlLabel>
                <Form.Control
                  name="url"
                  type="url"
                  onChange={(e) => handleFieldChange(e, "url")}
                />
              </Form.Group>
            )}

            <ButtonComponent block buttontext="Submit" />

            <div style={{ marginTop: "80px" }}>
              <Card
                className="strpied-tabled-with-hover"
                style={{ borderRadius: "10px" }}
              >
                <Card.Header
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Title as="h4">Banner Manager Table</Card.Title>
                </Card.Header>
                {isLoading ? (
                  <Loading isLoading={isLoading} noData={data?.length == 0} />
                ) : (
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">ID</th>
                          <th className="border-0">Image</th>
                          <th className="border-0">Image Redirection</th>
                          <th className="border-0">Url</th>
                          <th className="border-0">Status</th>
                          <th className="border-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{item?.id}</td>
                            <td>
                              <img
                                src={item?.image}
                                alt="image"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item?.is_redirect == 1 ? "Yes" : "No"}
                            </td>
                            <td>{item?.url}</td>
                            <td>
                              <div
                                style={{
                                  backgroundColor:
                                    item?.active == "1" ? "green" : "red",
                                  border: "none",
                                  fontSize: "0.75rem",
                                  color: "white",
                                  padding: "3px 10px",
                                  borderRadius: "17px",
                                  display: "inline-block",
                                }}
                              >
                                {item?.active == "1" ? "active" : "block"}
                              </div>
                            </td>

                            <td>
                              {item?.active === "1" && (
                                <Button
                                  className="btn-simple btn-link p-1"
                                  type="button"
                                  style={{ cursor: "pointer", color: "red" }}
                                  onClick={() => {
                                    setShowModal(true);
                                    setBlockData(item.id);
                                  }}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              )}
                              {item?.active == "0" && (
                                <Button
                                  className="btn-simple btn-link p-1"
                                  type="button"
                                  variant="success"
                                  onClick={() => {
                                    setShowActiveModal(true);
                                    setBlockData(item.id);
                                  }}
                                >
                                  <i className="fa fa-check"></i>
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                )}
              </Card>
            </div>
          </Form>
        </div>
      </div>

      <BlockBanner
        showModal={showModal}
        setShowModal={setShowModal}
        blockData={blockData}
        getBanner={getBanner}
      />
      <ActiveBanner
        showActiveModal={showActiveModal}
        setShowActiveModal={setShowActiveModal}
        blockData={blockData}
        getBanner={getBanner}
      />
    </>
  );
};

export default BannerManager;
