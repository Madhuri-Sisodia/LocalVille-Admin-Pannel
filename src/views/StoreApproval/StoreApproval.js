import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import ViewStoreDetails from "./ViewStoreDetails";

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

const StoreApproval = () => {
  const [data, setData] = useState([]);
  const [storeDetails, setStoreDeatils] = useState(false);

  useEffect(() => {
    Http.GetAPI(apis.getUnverifiedStore + "?" + Math.random(), data, null)
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
  }, []);

  const handleClick = () => {
    console.log("store details");
    setStoreDeatils(true);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Stores Approval</Card.Title>

                <p className="card-category">Stores approval and action</p>
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
                      <th className="border-0">Store Image</th>
                      <th className="border-0">Store Name</th>

                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr style={{ fontSize: "0.95rem" }} key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.store_image}
                            alt="image"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{item.store_name}</td>

                        <td>
                        <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="primary" 
                            onClick={handleClick}
                          >
                            <i className="fa fa-eye"></i>
                          </Button>

                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="success"
                            onClick={() => {
                              setSelectedStore(item);
                              setShowVerifyStore(true);
                            }}
                          >
                            <i className="fa fa-check"></i>
                          </Button>

                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
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
        </Row>
      </Container>

      <ViewStoreDetails/>
    </>
  );
};


export default StoreApproval;