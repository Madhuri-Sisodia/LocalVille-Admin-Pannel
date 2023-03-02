import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";
import "../../assets/css/day.css";
import UpdateStore from "./UpdateStore";
import AddStore from "./AddStore";
import BlockStore from "./BlockStore";

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
import ViewProduct from "views/ProductApproval/ViewProduct";
import ViewStore from "./ViewStore";

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
  const [showAddStore, setShowAddStore] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [blockStore, setBlockStore] = useState([]);
  const [showUpdateStore, setShowUpdateStore] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [days, setDays] = useState([]);

  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

  const getStore = () => {
    Http.GetAPI(apis.getStoreData + "?" + Math.random(), data, null)
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };
  console.log("data", data);
  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    if (rowData.opening_days) {
      let parsedDays;
      if (Array.isArray(rowData.opening_days)) {
        parsedDays = rowData.opening_days;
        parsedDays = JSON.parse(rowData.opening_days);
      } else if (typeof rowData.opening_days === "string") {
        parsedDays = rowData.opening_days.split(",");
      }
      setDays(parsedDays);
    }
  }, [rowData]);

  const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Button
                  className="btn-fill float-right"
                  style={{
                    backgroundColor: "blueviolet",
                    borderColor: "blueviolet",
                  }}
                  type="submit"
                  onClick={() => {
                    setShowAddStore(true);
                  }}
                >
                  Add Stores
                </Button>
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
                        <td>{item.id}</td>
                        <td>{item.vendor_id}</td>
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
                        <td title={item.store_name}>
                          {item.store_name.slice(0, 5)}
                        </td>
                        <td title={item.store_desc}>
                          {item.store_desc.slice(0, 8)}
                        </td>
                        <td title={item.store_address}>
                          {item.store_address.slice(0, 10)}
                        </td>
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
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            style={{ color: "gray" }}
                            onClick={() =>
                              getLocation(item.latitude, item.longitude)
                            }
                          >
                            <i className="fa fa-location-arrow"></i>
                          </Button>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              style={{ color: "blue" }}
                              onClick={() => {
                                setShowDetailsModal(true);
                                setRowData(item);
                              }}
                            >
                              <i className="fa fa-eye"></i>
                            </Button>
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="primary"
                              onClick={() => {
                                setSelectedStore(item);
                                setShowUpdateStore(true);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </Button>

                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={() => {
                                setShowModal(true);
                                setBlockData(item.id);
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </div>
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

      <UpdateStore
        showUpdateStore={showUpdateStore}
        setShowUpdateStore={setShowUpdateStore}
        item={selectedStore}
        getStore={getStore}
      />

      <AddStore
        showAddStore={showAddStore}
        setShowAddStore={setShowAddStore}
        getStore={getStore}
      />
      <BlockStore
        showModal={showModal}
        setShowModal={setShowModal}
        blockData={blockData}
        getStore={getStore}
      />
      <ViewStore
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        rowData={rowData}
      />
    </>
  );
};

export default StoreManager;
