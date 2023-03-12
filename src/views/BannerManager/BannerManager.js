import React, { useState, useEffect } from "react";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import NotificationAlert from "react-notification-alert";

import {
  Form,
  Radio,
  RadioGroup,
  Button,
  ButtonToolbar,
  SelectPicker,
  Checkbox,
} from "rsuite";
import { Table, Card, Col } from "react-bootstrap";
import CloseIcon from "@rsuite/icons/Close";

import "../../assets/css/admin.css";
import BlockBanner from "./BlockBanner";

const BannerManager = () => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     image: "https://i.pravatar.cc/50",
  //     redirect: "Yes",
  //     url: "url1",
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     image: "https://i.pravatar.cc/50",
  //     redirect: "Yes",
  //     url: "url2",
  //     status: "block",
  //   },
  //   {
  //     id: 3,
  //     image: "https://i.pravatar.cc/50",
  //     redirect: "No",
  //     url: "url3",
  //     status: "active",
  //   },
  // ];
  const [formData, setFormData] = useState({
    image: "",
    redirect: "",
    url: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [blockData, setBlockData] = useState([]);
  const [addBanner, setAddBanner] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Banner Details Successfully Added..!!</b>
          </div>
        </div>
      ),
      type: "success",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };


  const getBanner = () => {
    Http.GetAPI(apis.getBanner + "?" + Math.random(), data)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);
  // -------------------------------------------Base64--------------------
  // var base64String = "";
  // function Uploaded() {
  //     var file = document.querySelector(
  //         'input[type=file]')['files'][0];
  //     var reader = new FileReader();
  //     reader.onload = function () {
  //         base64String = reader.result.replace("data:", "")
  //             .replace(/^.+,/, "");
  //         let imageBase64Stringsep = base64String;
  //         console.log("string1", base64String);

  //     }
  //     reader.readAsDataURL(file);

  //}
  // *********************************************************************
  const resetForm = () => {
    setFormData({
      image: "",
      redirect: "",
      url: "",
    });
    setImageUrl("");
  };

  const handleSubmit = () => {
   

    var data = new FormData();
    data.append("banner_image", imageUrl);
     console.log("images", imageUrl);
    data.append("is_redirect", formData.redirect);
    data.append("url", formData.url);
    data.append("active", 1);

    Http.PostAPI(apis.addBanner, data)
      .then((res) => {
        console.log("resp", res);
        if (res?.data?.status) {
          setAddBanner(res?.data?.data);
          getBanner();
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
    resetForm();
    notify("tr");
  };

  

  const handleFieldChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
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
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>IMAGE REDIRECTION</Form.ControlLabel>
              <RadioGroup
                name="redirect"
                inline
                onChange={(value) => handleFieldChange(value, "redirect")}
                required
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </RadioGroup>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>URL</Form.ControlLabel>
              <Form.Control
                name="url"
                type="url"
                onChange={(value) => handleFieldChange(value, "url")}
                required
              />
            </Form.Group>

            <button
              type="submit"
              block
              style={{
                backgroundColor: "blueviolet",
                border: "blueviolet",
                borderRadius: "3px 3px 3px 3px",
                width: "100%",
                padding: "10px",
                color: "white",
                marginTop: "20px",
                fontSize: "0.9rem",
              }}
            >
              Submit
            </button>

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
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src={item.image}
                              alt="image"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.is_redirect == "1" ? "Yes" : "No"}
                          </td>
                          <td>{item.url}</td>
                          <td>
                            <div
                              style={{
                                backgroundColor:
                                  item.active == "1" ? "green" : "red",
                                border: "none",
                                fontSize: "0.75rem",
                                color: "white",
                                padding: "3px 10px",
                                borderRadius: "17px",
                                display: "inline-block",
                              }}
                            >
                              {item.active == "1" ? "active" : "block"}
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
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
    </>
  );
};

export default BannerManager;
