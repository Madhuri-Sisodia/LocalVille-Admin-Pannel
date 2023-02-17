import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import { RxCross1 } from "react-icons/rx";
import { RiQuestionMark } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../config/Service";
import { apis } from "../config/WebConstant";

import {
  Modal,
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

// const data = [
//   {
//     id: 1,
//     vendorImage: "https://i.pravatar.cc/50",
//     vendorName: "Vendor 1",
//     email: "vendor1@email.com",
//     phone: "555-555-5555",
//     status: "active",
//     loginCount: 0,
//   },
//   {
//     id: 2,
//     vendorImage: "https://i.pravatar.cc/50",
//     vendorName: "Vendor 2",
//     email: "vendor2@email.com",
//     phone: "555-555-5556",
//     status: "block",
//     loginCount: 5,
//   },
//   {
//     id: 3,
//     vendorImage: "https://i.pravatar.cc/50",
//     vendorName: "Vendor 3",
//     email: "vendor3@email.com",
//     phone: "555-555-5557",
//     status: "active",
//     loginCount: 2,
//   },
//   {
//     id: 4,
//     vendorImage: "https://i.pravatar.cc/50",
//     vendorName: "Vendor 3",
//     email: "vendor3@email.com",
//     phone: "555-555-5557",
//     status: "active",
//     loginCount: 2,
//   },
//   {
//     id: 5,
//     vendorImage: "https://i.pravatar.cc/50",
//     vendorName: "Vendor 3",
//     email: "vendor3@email.com",
//     phone: "555-555-5557",
//     status: "block",
//     loginCount: 2,
//   },
// ];

const VendorsManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);
  const [blockUser, setBlockUser] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (id) => {
    setShowModal(false);
    setDeleteId(id);
    // data = data.filter(item => item.id !== id);
  };

  const getVendors = () => {
    Http.GetAPI(apis.getVendorsData + "?" + Math.random(), data, null)
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
    getVendors();
  }, []);

  const handleBlockUser = (id) => {
    var data = new FormData();
    data.append("id", id);
    console.log("usersss", data);
    Http.PostAPI(apis.blockUser, data, null)
      .then((res) => {
        console.log("user", res);
        if (res?.data?.status) {
          setBlockUser(res?.data?.data);
          getVendors();
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
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Vendors Manager</Card.Title>
                <p className="card-category">Vendors details and action</p>
                <br></br>
                <InputGroup style={{ width: "250px" }}>
                  <Input placeholder="Search" />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Vendor Image</th>
                      <th className="border-0">Vendor Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Login Count</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr style={{ fontSize: "0.95rem" }} key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.user_image}
                            alt="image"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          {console.log("image", item.user_image)}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
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
                        <td>{item.login_count}</td>
                        <td>
                          <RxCross1
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#dc3545",
                            }}
                            onClick={() => {
                              setShowModal(true);
                              setBlockData(item.id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

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
                  color: "gray",
                }}
              />
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Are you sure you want to block this store?</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              variant="danger"
              onClick={() => {
                handleBlockUser(blockData);
                setShowModal(false);
              }}
            >
              Block
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default VendorsManager;
