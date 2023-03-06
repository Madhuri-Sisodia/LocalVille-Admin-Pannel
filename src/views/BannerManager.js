import React, { useState } from "react";
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

import "../assets/css/admin.css";

const BannerManager = () => {
  const data = [
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
  const [tableData, setTableData] = useState([]);

  const handleSubmit = () => {
    const newFormData = { ...formData };
    setTableData([...tableData, newFormData]);
    console.log(formData);
    resetForm();
    
  };
   

  const resetForm=()=>{
    setFormData({
      image: "",
      redirect: "",
      url: "",
    });

  }
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
              <Card className="strpied-tabled-with-hover">
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
                      {tableData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src="https://i.pravatar.cc/50"
                              alt="image"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </td>
                          <td>{item.redirect}</td>
                          <td>{item.url}</td>
                          <td>
                            <div
                              style={{
                                backgroundColor:
                                  item.status == "active" ? "green" : "red",
                                border: "none",
                                fontSize: "0.75rem",
                                color: "white",
                                padding: "3px 10px",
                                borderRadius: "17px",
                                display: "inline-block",
                              }}
                            >
                              {item.status == "active" ? "active" : "block"}
                            </div>
                          </td>
                          <td>
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              style={{ cursor: "pointer", color: "red" }}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
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
    </>
  );
};

export default BannerManager;
