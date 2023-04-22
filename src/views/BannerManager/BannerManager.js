import React, { useState, useEffect, useRef } from "react";
import { Http } from "../../config/Service";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

import { Form, Radio, RadioGroup, Button, Uploader } from "rsuite";
import { Table, Card, Col } from "react-bootstrap";

import "../../assets/css/admin.css";
import BlockBanner from "./BlockBanner";
import ButtonComponent from "views/ButtonComponent";
import Loading from "customComponents/Loading";
import ActiveBanner from "./ActiveBanner";

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
  const fileInputRef = useRef(null);

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

    fileInputRef.current.value = "";
    setImageUrl(null);
  };

  const handleSubmit = () => {
    //  e.preventDefault();
    let redirectImg;
    if (formData.redirect) {
      redirectImg = "1";
    } else {
      redirectImg = "0";
    }

    var data = new FormData();
    data.append("banner_image", imageUrl);
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
    resetForm();
  };

  const handleFieldChange = (value, name) => {
    setFormData((previous) => {
      return { ...previous, [name]: value };
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

              <input
                type="file"
                name="imageUrl"
                required
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
                ref={fileInputRef}
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>IMAGE REDIRECTION</Form.ControlLabel>
              <RadioGroup
                name="redirect"
                inline
                onChange={(value) => handleFieldChange(value, "redirect")}
                value={formData.redirect}
                required
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </Form.Group>

            {formData.redirect == "1" && (
              <Form.Group>
                <Form.ControlLabel>URL</Form.ControlLabel>
                <Form.Control
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={(value) => handleFieldChange(value, "url")}
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
                              {item?.active == "1" && (
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
