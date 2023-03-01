import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";

import {
  Modal,
  Form,
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
import VerifyProduct from "./VerifyProduct";
import ViewProduct from "./ViewProduct";
import RejectProduct from "./RejectProduct";

const ProductApproval = () => {
  const [data, setData] = useState([]);
  const [showVerifiedProduct, setShowVerifiedProduct] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showRejectProduct, setShowRejectProduct] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [product, setProduct] = useState([]);

  const getUnverifiedProduct = () => {
    Http.GetAPI(apis.getUnverifiedProducts + "?" + Math.random(), data, null)
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

  useEffect(() => {
    getUnverifiedProduct();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Products Approval</Card.Title>

                <p className="card-category">Products details and action</p>
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
                      <th className="border-0">Product Image</th>
                      <th className="border-0">Product Name</th>
                      <th className="border-0">Status</th>

                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr style={{ fontSize: "0.95rem" }} key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.theme_img}
                            alt="image"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{item.product_name}</td>
                        <td>
                          <div
                            style={{
                              backgroundColor:
                                item.is_verified == "0"
                                  ? "blue"
                                  : item.is_verified == "1"
                                  ? "green"
                                  : "red",
                              border: "none",
                              fontSize: "0.75rem",
                              color: "white",
                              padding: "3px 10px",
                              borderRadius: "17px",
                              display: "inline-block",
                            }}
                          >
                            {item.is_verified == "0"
                              ? "unverified"
                              : item.is_verified == "1"
                              ? "verified"
                              : "pending"}
                          </div>
                        </td>
                        <td>
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="primary"
                            onClick={() => {
                              setShowProductDetails(true);
                              setRowData(item);
                            }}
                          >
                            <i className="fa fa-eye"></i>
                          </Button>
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="success"
                            onClick={() => {
                              setShowVerifiedProduct(true);
                              setProduct(item);
                            }}
                          >
                            <i className="fas fa-check"></i>
                          </Button>

                          <button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                            onClick={() => {
                              setShowRejectProduct(true);
                              setProduct(item);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <VerifyProduct
          showVerifiedProduct={showVerifiedProduct}
          setShowVerifiedProduct={setShowVerifiedProduct}
          product={product}
          getUnverifiedProduct={getUnverifiedProduct}
        />

        <ViewProduct
          showProductDetails={showProductDetails}
          setShowProductDetails={setShowProductDetails}
          rowData={rowData}
        />
        <RejectProduct
          showRejectProduct={showRejectProduct}
          setShowRejectProduct={setShowRejectProduct}
          product={product}
          
        />
        
      </Container>
    </>
  );
};

export default ProductApproval;
