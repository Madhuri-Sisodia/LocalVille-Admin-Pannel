import React from "react";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import {
  Card,
  Button,
  Modal,
  Form,
  CloseButton,
  Badge,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const InvoiceData = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={"12"}>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                {/* <Button
                  className="btn-fill float-right"
                  style={{
                    backgroundColor: "blueviolet",
                    borderColor: "blueviolet",
                  }}
                  type="submit"
                >
                  Add Invoice
                </Button> */}
                <Card.Title as="h4">Invoice Manager</Card.Title>
                <p className="card-category">Invoice details and action</p>
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
                      <th className="border-0">Id</th>
                      <th className="border-0">Invoice Number</th>
                      <th className="border-0">Vendor Id</th>
                      <th className="border-0">Vendor Name</th>
                      <th className="border-0">Store Name</th>
                      <th className="border-0">Total GST</th>
                      <th className="border-0">Total Amount</th>
                      <th className="border-0">Action</th>
                      <th className="border-0">PDF Icon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        fontSize: "0.90rem",
                        maxHeight: "1em",
                        overflow: "hidden",
                      }}
                    >
                      <td>ID</td>
                      <td>dummy_</td>
                      <td>
                        vendor id
                        {/* <img
                                src={item.theme_img}
                                alt={item.product_image}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              /> */}
                      </td>
                      <td>Vendor Name</td>
                      <td>Store Name</td>
                      <td>Total GST</td>
                      <td>Total Ammount</td>
                      <td>Action</td>
                      <td>pdf Icon</td>

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
                            variant="primary"
                          >
                            <i className="fa fa-eye"></i>
                          </Button>
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="primary"
                          >
                            <i className="fa fa-edit"></i>
                          </Button>
                          <Button
                            // index={item.id}
                            className="btn-simple btn-link p-2"
                            type="button"
                            variant=""
                          >
                            Download
                            {/* <i className="fas fa-times"></i> */}
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* {data.map((item) => (
                          <tr
                            style={{
                              fontSize: "0.90rem",
                              maxHeight: "1em",
                              overflow: "hidden",
                            }}
                            key={item.id}
                          >
                            <td>{item.id}</td>
                            <td>{item.uploader_vendor_id}</td>
                            <td>
                              <img
                                src={item.theme_img}
                                alt={item.product_image}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </td>
                            <td title={item.product_name}>
                              {item.product_name.slice(0, 5)}
                            </td>
                            <td title={item.product_desc}>
                              {item.product_desc.slice(0, 8)}
                            </td>
                            <td>{item.category_name}</td>
                            <td>{item.subcategory_name}</td>
                            <td>{item.is_buy == 1 ? "Yes" : "No"}</td>
                            <td>{item.is_pickup == 1 ? "Yes" : "No"}</td>
                            <td>{item.total_clicks}</td>
                            <td>{verifiedProduct(item.is_verified)}</td>
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
                            <td>{item.category_name}</td>
                            <td>{item.subcategory_name}</td>
                            <td>{item.is_color == 1 ? "Yes" : "No"}</td>
                            <td>{item.is_size == 1 ? "Yes" : "No"}</td>
                            <td>{item.price}</td>
                            <td>{item.discount_price}</td>

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
                                  variant="primary"
                                  
                                >
                                  <i className="fa fa-eye"></i>
                                </Button>
                                <Button
                                  className="btn-simple btn-link p-1"
                                  type="button"
                                  variant="primary"
                                 
                                >
                                  <i className="fa fa-edit"></i>
                                </Button>
                                <Button
                                  index={item.id}
                                  className="btn-simple btn-link p-1"
                                  type="button"
                                  variant="danger"
                                 
                                >
                                  <i className="fas fa-times" ></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))} */}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { InvoiceData };
