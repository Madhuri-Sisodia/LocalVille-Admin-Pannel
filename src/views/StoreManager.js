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
    vendor_id: 1,
    store_image: "https://dummyimage.com/300x200/000/fff",
    store_name: "Store 1",
    store_description: "This is the description for Store 1",
    store_address: "123 Main Street",
    pincode: "123456",
    city: "New York",
    state: "NY",
    country: "USA",
    opening_days: "Monday-Friday",
    opening_time: "9:00 AM",
    closing_time: "5:00 PM",
    total_clicks: "100",
    store_created: "2022-01-01",
    store_updated: "2022-02-01",
    status: "active",
  },
  {
    vendor_id: 2,
    store_image: "https://dummyimage.com/300x200/000/fff",
    store_name: "Store 2",
    store_description: "This is the description for Store 2",
    store_address: "123 Main Street",
    pincode: "123456",
    city: "New York",
    state: "NY",
    country: "USA",
    opening_days: "Monday-Saturday",
    opening_time: "9:00 AM",
    closing_time: "5:00 PM",
    total_clicks: "100",
    store_created: "2022-01-01",
    store_updated: "2022-02-01",
    status: "block",
  },
  {
    vendor_id: 3,
    store_image: "https://dummyimage.com/300x200/000/fff",
    store_name: "Store 3",
    store_description: "This is the description for Store 3",
    store_address: "123 Main Street",
    pincode: "123456",
    city: "New York",
    state: "NY",
    country: "USA",
    opening_days: "Monday-Saturday",
    opening_time: "9:00 AM",
    closing_time: "5:00 PM",
    total_clicks: "100",
    store_created: "2022-01-01",
    store_updated: "2022-02-01",
    status: "block",
  },
  {
    vendor_id: 4,
    store_image: "https://dummyimage.com/300x200/000/fff",
    store_name: "Store 4",
    store_description: "This is the description for Store 4",
    store_address: "123 Main Street",
    pincode: "123456",
    city: "New York",
    state: "NY",
    country: "USA",
    opening_days: "Monday-Saturday",
    opening_time: "9:00 AM",
    closing_time: "5:00 PM",
    total_clicks: "100",
    store_created: "2022-01-01",
    store_updated: "2022-02-01",
    status: "block",
  },
];

const StoreManager = () => {
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
                <Card.Title as="h4">Store Manager</Card.Title>
                <p className="card-category">Store details and action</p>
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
                <Table
                  responsive="xl"
                  style={{
                    width: "100%",
                    overflowX: "scroll",
                    display: "block",
                  }}
                  className="table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th className="border-0">Vendor ID</th>
                      <th className="border-0">Store Image</th>
                      <th className="border-0">Store Name</th>
                      <th className="border-0">Store Address</th>
                      <th className="border-0">Store Description</th>
                      <th className="border-0">Pincode</th>
                      <th className="border-0">City</th>
                      <th className="border-0">State</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">Opening Days</th>
                      <th className="border-0">Opening Time</th>
                      <th className="border-0">Closing Time</th>
                      <th className="border-0">Total Clicks</th>
                      <th className="border-0">Store Created</th>
                      <th className="border-0">Store Updated</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr style={{fontSize: "0.90rem"}} key={item.id}>
                        <td>{item.vendor_id}</td>
                        <td>
                          <img
                            src={item.store_image}
                            alt={item.store_name}
                            height="50"
                            width="50"
                          />
                        </td>
                        <td>{item.store_name}</td>
                        <td>{item.store_description}</td>
                        <td>{item.store_address}</td>
                        <td>{item.pincode}</td>
                        <td>{item.city}</td>
                        <td>{item.state}</td>
                        <td>{item.country}</td>
                        <td>{item.opening_days}</td>
                        <td>{item.opening_time}</td>
                        <td>{item.closing_time}</td>
                        <td>{item.total_clicks}</td>
                        <td>{item.store_created}</td>
                        <td>{item.store_updated}</td>

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

export default StoreManager;
