import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import { RxCross1 } from "react-icons/rx";
import { MdLocationPin } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import {MdClose} from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../config/Service";
import { apis } from "../config/WebConstant";
import "../assets/css/modal.css";

import {
  Modal,
  CloseButton,
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [blockStore, setBlockStore] = useState([]);

  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

  const getStore = () => {
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
  };

  useEffect(() => {
    getStore();
  }, []);

  const handleBlockStore = (id) => {
    var data = new FormData();
    data.append("id", id);
    console.log("usersss", data);
    Http.PostAPI(apis.blockStore, data, null)
      .then((res) => {
        console.log("user", res);
        if (res?.data?.status) {
          setBlockStore(res?.data?.data);
          getStore();
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
                    tableLayout: "fixed",
                    width: "100%",
                    overflowX: "scroll",
                    display: "block",
                  }}
                  className="table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th className="border-0">Store ID</th>
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
                      <th className="border-0">Get Location</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr 
                        style={{
                          fontSize: "0.90rem",
                          maxHeight: "1em",
                          overflow: "hidden",
                        }}
                        key={item.id}
                      >
                        <td title={item.id}>{item.id}</td>
                        <td title={item.vendor_id}>{item.vendor_id}</td>
                        <td>
                          <img title={item.store_image}
                            src={item.store_image}
                            alt={item.store_name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td title={item.store_name}>{item.store_name.slice(0, 5)}</td>
                        <td title={item.store_desc}>{item.store_desc.slice(0, 8)}</td>
                        <td title={item.store_address}>{item.store_address.slice(0, 10)}</td>
                        <td title={item.pincode}>{item.pincode}</td>
                        <td title={item.city}>{item.city}</td>
                        <td title={item.state}>{item.state}</td>
                        <td title={item.country}>{item.country}</td>
                        <td title={item.opening_days}>{item.opening_days}</td>
                        <td title={item.opening_time}>{item.opening_time}</td>
                        <td title={item.closing_time}>{item.closing_time}</td>
                        <td title={item.total_clicks}>{item.total_clicks}</td>
                        <td title={item.created_at}>{item.created_at}</td>
                        <td title={item.updated_at}>{item.updated_at}</td>

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
                          <MdLocationPin
                            style={{
                              fontSize: "25px",
                              cursor: "pointer",
                              color: "grey",
                            }}
                            onClick={() =>
                              getLocation(item.latitude, item.longitude)
                            }
                          />
                        </td>
                        <td>
                          <MdRemoveRedEye
                            style={{
                              fontSize: "23px",
                              cursor: "pointer",
                              color: "gray",
                            }}
                            onClick={() => {
                              setShowDetailsModal(true);
                              setRowData(item);
                            }}
                          />
                          <RxCross1
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#dc3545",
                            }}
                            onClick={() => {
                              setShowModal(true);
                              setShowDetailsModal(false);
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
      </Container>

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
              handleBlockStore(blockData);
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

    
        <Modal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
        >
          <Modal.Header className="modal-header" >
            <Modal.Title className="modal-title">View Store Details</Modal.Title>
            <MdClose className="close-icon" onClick={() => setShowDetailsModal(false)}/>
                          
          </Modal.Header>
        
          <Modal.Body className="modal-body">
            <Table striped bordered className="table" >
              <tbody>
                <tr>
                  <td className="bold-col">Vendor ID:</td>
                  <td>{rowData.vendor_id}</td>
                </tr>
                <tr>
                  <td className="bold-col">Store Image:</td>
                  <td>
                    <img
                      src={rowData.store_image}
                      alt={rowData.store_name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bold-col">Store Name:</td>
                  <td>{rowData.store_name}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>Store Description:</td>
                  <td>{rowData.store_desc}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>Store Address:</td>
                  <td>{rowData.store_address}</td>
                </tr>
                <tr>
                  <td className="bold-col">Pincode:</td>
                  <td>{rowData.pincode}</td>
                </tr>
                <tr>
                  <td className="bold-col">City:</td>
                  <td>{rowData.city}</td>
                </tr>
                <tr>
                  <td className="bold-col">State:</td>
                  <td>{rowData.state}</td>
                </tr>
                <tr>
                  <td className="bold-col">Country:</td>
                  <td>{rowData.country}</td>
                </tr>
                <tr>
                  <td className="bold-col">Opening Days:</td>
                  <td
                    style={{
                      backgroundColor:
                        rowData.opening_days == "[1,2,3,4,5,6]"
                          ? "red"
                          : "white",
                      border: "none",
                      height: "20px",
                      width: "20px",
                      fontSize: "0.75rem",
                      color: "white",
                      padding: " 10px",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  >
                    {rowData.opening_days == "[1,2,3,4,5,6]"
                      ? "M,T,W,TH,F,S"
                      : "S"}
                  </td>
                </tr>
                <tr>
                  <td className="bold-col">Opening Time:</td>
                  <td>{rowData.opening_time}</td>
                </tr>

                <tr>
                  <td className="bold-col">Closing Time:</td>
                  <td>{rowData.closing_time}</td>
                </tr>

                <tr>
                  <td className="bold-col">Total Clicks:</td>
                  <td>{rowData.total_clicks}</td>
                </tr>
                <tr>
                  <td className="bold-col">Store Created:</td>
                  <td>{rowData.created_at}</td>
                </tr>
                <tr>
                  <td className="bold-col">Store Updated:</td>
                  <td>{rowData.updated_at}</td>
                </tr>
                <tr>
                  <td className="bold-col">Status:</td>

                  <td
                    style={{
                      backgroundColor: rowData.active == "1" ? "green" : "red",
                      border: "none",
                      fontSize: "0.75rem",
                      color: "white",
                      padding: "0px 7px",
                      borderRadius: "17px",
                      display: "inline-block",
                    }}
                  >
                    {rowData.active == "1" ? "active" : "block"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer ></Modal.Footer>
        </Modal>
     
    </>
  );
};

export default StoreManager;
