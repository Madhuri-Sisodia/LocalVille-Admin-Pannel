import React, { useState,useEffect } from "react";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
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
  const dummyData = [
    {
      id: 1,
      image: "https://i.pravatar.cc/50",
      redirect: "Yes",
      url: "url1",
      status: "active",
    },
    {
      id: 2,
      image: "https://i.pravatar.cc/50",
      redirect: "Yes",
      url: "url2",
      status: "block",
    },
    {
      id: 3,
      image: "https://i.pravatar.cc/50",
      redirect: "No",
      url: "url3",
      status: "active",
    },
  ];
  const [formData, setFormData] = useState({
    image: "",
    redirect: "",
    url: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [blockData, setBlockData] = useState([]);


  const getBanner = () => {
    Http.GetAPI(apis.getBanner + "?" + Math.random(), data, null)
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

  const handleSubmit = () => {
    console.log(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      image: "",
      redirect: "",
      url: "",
    });
  };
  const handleFieldChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="MainContainer">
        <div className="Container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group>
              <Form.ControlLabel>IMAGE</Form.ControlLabel>
              <Form.Control
                name="image"
                accept="image/*"
                type="file"
                onChange={(value) => handleFieldChange(value, "image")}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>IMAGE REDIRECTION</Form.ControlLabel>
              <RadioGroup
                name="redirect"
                inline
                onChange={(value) => handleFieldChange(value, "redirect")}
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
                          <td style={{textAlign:"center"}}>
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
