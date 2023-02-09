import React, { useState } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import { RxCross1 } from "react-icons/rx";
import SearchIcon from "@rsuite/icons/Search";
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

const data = [
  {
    id: 1,
    vendorImage: "https://i.pravatar.cc/50",
    vendorName: "Vendor 1",
    email: "vendor1@email.com",
    phone: "555-555-5555",
    status: "active",
    loginCount: 0,
  },
  {
    id: 2,
    vendorImage: "https://i.pravatar.cc/50",
    vendorName: "Vendor 2",
    email: "vendor2@email.com",
    phone: "555-555-5556",
    status: "blocked",
    loginCount: 5,
  },
  {
    id: 3,
    vendorImage: "https://i.pravatar.cc/50",
    vendorName: "Vendor 3",
    email: "vendor3@email.com",
    phone: "555-555-5557",
    status: "active",
    loginCount: 2,
  },
  {
    id: 4,
    vendorImage: "https://i.pravatar.cc/50",
    vendorName: "Vendor 3",
    email: "vendor3@email.com",
    phone: "555-555-5557",
    status: "active",
    loginCount: 2,
  },
  {
    id: 5,
    vendorImage: "https://i.pravatar.cc/50",
    vendorName: "Vendor 3",
    email: "vendor3@email.com",
    phone: "555-555-5557",
    status: "blocked",
    loginCount: 2,
  },
];

const VendorsManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setShowModal(false);
    setDeleteId(id);
    // data = data.filter(item => item.id !== id);
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
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.vendorImage}
                            alt={item.vendorName}
                            height="50"
                            width="50"
                          />
                        </td>
                        <td>{item.vendorName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor:
                                item.status === "active" ? "green" : "red",
                              border: "none",
                              fontSize: "0.75rem",
                              color: "white",
                              padding: "3px 9px",
                              borderRadius: "17px",
                            }}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td>{item.loginCount}</td>
                        <td>
                          <RxCross1
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#dc3545",
                            }}
                            onClick={() =>
                              setDeleteId(item.id) & setShowModal(true)
                            }
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
          style={{
            display: "flex",
            alignItems: "right",
            justifyContent: "right",
          }}
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-bulb-63"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Are you sure you want to delete this item?</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="danger"
              onClick={() => handleDelete(deleteId)}
            >
              Delete
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
