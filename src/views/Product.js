import React from 'react';
import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup } from "rsuite";
import CloseIcon from '@rsuite/icons/Close';
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

const Product = () => {
  return (
        <>
       <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Product Manager</Card.Title>
                <p className="card-Product">Product details and action</p>
                <br></br>
                <InputGroup style={{ width: "250px" }}>
                  <Input placeholder="Search" />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
                <br></br>
              </Card.Header>
              <Col md="12">
                        <Card className="strpied-tabled-with-hover">

                            {/* <Card.Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Card.Title as="h4">Sub-Categoty Table</Card.Title>
                
                            </Card.Header> */}

                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Product Type</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Product Type</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Product Type</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Product Type</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Product Type</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Product Type</th>
                                            <th className="border-0">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>

                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Minerva Hooper</td>
                                            <td>$23,789</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>

                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>$56,142</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                        <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>$56,142</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                        <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>$56,142</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                        <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>$56,142</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
              {/* <Card.Body className="table-full-width table-responsive px-0">
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
              </Card.Body> */}
            </Card>
          </Col>
        </Row>
      </Container>
      </>
  )
}

export default Product
