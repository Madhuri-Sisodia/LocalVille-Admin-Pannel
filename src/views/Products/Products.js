import React, { useState, useEffect } from "react";
import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup } from "rsuite";
// import CloseIcon from '@rsuite/icons/Close';
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { RxUpdate } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
// import UpdateProducts from "./UpdateProducts";

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

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = () => {
    Http.GetAPI(apis.getProduct + "?" + Math.random(), data, null)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          console.log(res?.data?.data)
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
    getProducts();
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">product Manager</Card.Title>
                <p className="card-category">product details and action</p>
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
                      <th className="border-0"> ID</th>
                      <th className="border-0">UPloader Vendor ID</th>
                      <th className="border-0">Products Name</th>
                      <th className="border-0">Products Description</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">SubCategory</th>
                      <th className="border-0"> buy</th>
                      <th className="border-0">Pickup</th>
                      <th className="border-0"></th>
                      <th className="border-0">Total Clicks</th>
                      <th className="border-0">Verified</th>
                      <th className="border-0"> Created</th>
                      <th className="border-0">Modified</th>
                      <th className="border-0">Category Name</th>
                      <th className="border-0">SubCategory Name</th>
                      <th className="border-0">Color</th>
                      <th className="border-0">Size</th>
                      <th className="border-0">Status</th>
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
                        <td>{item.uploader_vendor_id}</td>
                        <td>
                          <img
                            src={item.theme_img}
                            alt={item.product_name}
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
                        {/* <td title={item.product_address}>
                          {item.product_address.slice(0, 10)}
                        </td> */}
                        <td>{item.category}</td>
                        <td>{item.sub_category}</td>
                        <td>{item.is_buy}</td>
                        <td>{item.is_pickup}</td>
                        <td>{item.total_clicks}</td>
                        <td>{item.is_verified}</td>
                        <td>{item.category_name}</td>
                        <td>{item.subcategory_name}</td>
                        <td>{item.is_color}</td>
                        <td>{item.is_size}</td>
                        <td>{item.price}</td>
                        <td>{item.discount_price}</td>

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

                        </td>
                        <div style={{ marginTop: "1rem" }}>
                          <span style={{ display: "inline-block" }}>
                            <RxUpdate
                              style={{
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "grey",
                              }}
                              onClick={() => {
                                setSelectedproduct(item);
                                setShowUpdateproduct(true);
                              }}
                            />
                          </span>
                          <span style={{ display: "inline-block" }}>
                            <RxCross1
                              style={{
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "#dc3545",
                              }}
                              onClick={() => {
                                setShowModal(true);
                                setShowDetailsModal(false);
                                setBlockData(item.id);
                              }}
                            />
                          </span>
                        </div>
                      </tr>
                    ))}
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

export default Products;
