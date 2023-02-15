import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import { RxCross1 } from "react-icons/rx";
import { RiQuestionMark } from "react-icons/ri";
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
//     vendor_id: 1,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 1",
//     store_description: "This is the description for Store 1",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Friday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "active",
//   },
//   {
//     vendor_id: 2,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 2",
//     store_description: "This is the description for Store 2",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Saturday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "block",
//   },
//   {
//     vendor_id: 3,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 3",
//     store_description: "This is the description for Store 3",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Saturday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "block",
//   },
//   {
//     vendor_id: 4,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 4",
//     store_description: "This is the description for Store 4",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Saturday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "block",
//   },
// ];

const StoreManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const handleDelete = (id) => {
    setShowModal(false);
    setDeleteId(id);
    // data = data.filter(item => item.id !== id);
  };
  const handleRowClick = (item) => {
    setShowModal(true);
    setRowData(item);
  };

  useEffect(() => {
    // const token = JSON.parse(sessionStorage.getItem("userData"));
    // console.log(token)
    // if (!token) {
    //   navigate("/login");
    // }

    Http.GetAPI(apis.getStoreData + "?" + Math.random(), data, null)
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
  }, []);
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
                    tableLayout:"fixed",
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
                      <tr
                        onClick={() =>
                          handleRowClick(item) && handleDelete(item.id)
                        }
                        style={{ fontSize: "0.90rem", maxHeight: "1em",
                        overflow: "hidden" }}
                        key={item.id}
                      >
                        <td className="truncate">{item.vendor_id}</td>
                        <td>
                          <img
                            src={item.store_image}
                            alt={item.store_name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{item.store_name}</td>
                        <td className="truncate">{item.store_desc}</td>
                        <td className="truncate">{item.store_address}</td>
                        <td>{item.pincode}</td>
                        <td>{item.city}</td>
                        <td>{item.state}</td>
                        <td>{item.country}</td>
                        <td>{item.opening_days}</td>
                        <td>{item.opening_time}</td>
                        <td>{item.closing_time}</td>
                        <td>{item.total_clicks}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>

                        <td>
                          <div
                            style={{
                              backgroundColor:
                                item.active == "1" ? "green" : "red",
                              border: "none",
                              fontSize: "0.75rem",
                              color: "white",
                              padding: "3px 9px",
                              borderRadius: "17px",
                              display: "inline-block",
                            }}
                          >
                            {item.active == "1" ? "active" : "block"}
                          </div>
                        </td>
                        <td>
                          <RxCross1
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#dc3545",
                            }}
                            onClick={() => setShowModal(true)}
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
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <Modal.Title>Store Details</Modal.Title>
            {/* <div className="modal-profile">
              <RiQuestionMark
                style={{
                  fontSize: "30px",
                }}
              />
            </div> */}
          </Modal.Header>
          <Modal.Body className="text-left">
            <div>
              <tr>
                <td>Vendor ID:</td>
                <td>{rowData.vendor_id}</td>
              </tr>
              <tr>
                <td>Store Image:</td>
                <td>
                  <img
                    src={rowData.store_image}
                    alt={rowData.store_name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Store Name:</td>
                <td>{rowData.store_name}</td>
              </tr>
              <tr>
                <td style={{ whiteSpace: "nowrap" }}>Store Description:</td>
                <td>{rowData.store_desc}</td>
              </tr>
              <tr>
                <td style={{ whiteSpace: "nowrap" }}>Store Address:</td>
                <td>{rowData.store_address}</td>
              </tr>
              <tr>
                <td>Pincode:</td>
                <td>{rowData.pincode}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{rowData.city}</td>
              </tr>
              <tr>
                <td>State:</td>
                <td>{rowData.state}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{rowData.country}</td>
              </tr>
              <tr>
                <td>Opening Days:</td>
                <td>{rowData.opening_days}</td>
              </tr>
              <tr>
                <td>Opening Time:</td>
                <td>{rowData.opening_time}</td>
              </tr>

              <tr>
                <td>Closing Time:</td>
                <td>{rowData.closing_time}</td>
              </tr>

              <tr>
                <td>Total Clicks:</td>
                <td>{rowData.total_clicks}</td>
              </tr>
              <tr>
                <td>Store Created:</td>
                <td>{rowData.created_at}</td>
              </tr>
              <tr>
                <td>Store Updated:</td>
                <td>{rowData.updated_at}</td>
              </tr>
              <tr>
                <td>Status:</td>

                <td
                  style={{
                    backgroundColor: rowData.active == "1" ? "green" : "red",
                    border: "none",
                    fontSize: "0.75rem",
                    color: "white",
                    padding: "3px 9px",
                    borderRadius: "17px",
                    display: "inline-block",
                  }}
                >
                  {rowData.active == "1" ? "active" : "block"}
                </td>
              </tr>
            </div>
            {/* <p>Are you sure you want to delete this store?</p> */}
          </Modal.Body>
          <div className="modal-footer">
            {/* <Button
              className="btn-simple"
              type="button"
              variant="danger"
              onClick={() => handleDelete(deleteId)}
            >
              Delete
            </Button> */}
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
