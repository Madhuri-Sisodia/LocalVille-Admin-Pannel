import React, { useState, useEffect } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import { MdLocationPin } from "react-icons/md";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

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
 import ViewStoreDetails from "./ViewStoreDetails";
 import VerifiedStore from "./VerifiedStore";
 import RejectStore from "./RejectStore";

const StoreApproval = () => {
  const [data, setData] = useState([]);
  const [showVerifiedStore, setShowVerifiedStore] = useState(false);
  const [showStoreDetails, setShowStoreDetails] = useState(false);
  const [showRejectStore, setShowRejectStore] = useState(false);
  const [storeApproval, setStoreApproval] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [store, setStore] = useState([]);
  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

  const getUnverifiedStore = () => {
    Http.GetAPI(apis.getUnverifiedStore + "?" + Math.random(), data, null)
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
          setStoreApproval(false);
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
    getUnverifiedStore();
  }, [storeApproval]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Store Approval</Card.Title>

                <p className="card-category">Stores details and action</p>
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
                <Table className="table-hover table-striped"
                  responsive="xl"
                  style={{
                    tableLayout: "fixed",
                    width: "100%",
                    display: "block",
                  }}
                >
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Store Image</th>
                      <th className="border-0">Store Name</th>
                      <th className="border-0">Store Address</th>
                      <th className="border-0">Opening Days</th>
                      <th className="border-0">Get Location</th>
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
                        <td>{item.store_address}</td>
                        {/* <td>{item.opening_days}</td> */}
                        <td>
                          {item.opening_days == "[1,2,3,4,5,6]"
                              ? "M,T,W,Th,F,S"
                              : "S"}</td>
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
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="primary"
                            onClick={() => {
                              setShowStoreDetails(true);
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
                              setShowVerifiedStore(true);
                              setStore(item);
                            }}
                          >
                            <i className="fa fa-check"></i>
                          </Button>

                          <button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                            onClick={() => {
                              setShowRejectStore(true);
                              setStore(item);
                            }}
                          >
                            <i className="fa fa-times"></i>
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

        <VerifiedStore
          showVerifiedStore={showVerifiedStore}
          setShowVerifiedStore={setShowVerifiedStore}
          store={store}
          getUnverifiedStore={getUnverifiedStore}
        />

        <ViewStoreDetails
          showStoreDetails={showStoreDetails}
          setShowStoreDetails={setShowStoreDetails}
          rowData={rowData}
        />
        <RejectStore
          showRejectStore={showRejectStore}
          setShowRejectStore={setShowRejectStore}
          store={store}
        />
        
      </Container>
    </>
  );
};

export default StoreApproval;
