import React, { useState, useEffect, useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import Paginte from "components/Paginate";
import { Utils } from "CommonUtils/Utils";

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
  const {pageNo,setDisabledNext} = useContext(Utils)
  const [rowData, setRowData] = useState([]);
  const [product, setProduct] = useState([]);

  const getUnverifiedProduct = () => {
    Http.GetAPI(process.env.REACT_APP_GETUNVERIFIEDPRODUCTS + "?" +`page=${pageNo}`, data, null)
      .then((res) => {
        if (res?.data?.status) {
          if(res.data.data.length>0){
            setData(res?.data?.data);
          }
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
  }, [pageNo]);

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

                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                            onClick={() => {
                              setShowRejectProduct(true);
                              setProduct(item);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <Paginte/>
        </div>
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
          getUnverifiedProduct={getUnverifiedProduct}
          product={product}
        />
      </Container>
    </>
  );
};

export default ProductApproval;
