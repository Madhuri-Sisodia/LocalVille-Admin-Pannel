import React, { useState, useEffect, useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import UpdateVendor from "./UpdateVendor";
import { Utils } from "CommonUtils/Utils";
import AddVendor from "./AddVendor";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Loading from "customComponents/Loading";
import image from "assets/img/noVendor.png";

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
import BlockVendor from "./BlockVendor";
import Pagenate from "components/Pagenate";

const VendorsManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [blockData, setBlockData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [currentModalIdx, setCurrentModalIdx] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { pageNo, setDisabledNext, pageView, setPageView } = useContext(Utils);

  const [isLoading, setIsLoading] = useState(true);
  const notificationAlertRef = React.useRef(null);

  const Debounce = (fun) => {
    let timer;
    return (...arg) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fun.call(this, arg);
      }, 500);
    };
  };

  const getVendors = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETVENDORSDATA + "?" + `page=${pageView}`,
      data,
      null
    )
      .then((res) => {
        setIsLoading(false);
        console.log("respnse----->", res);
        if (res?.data?.status) {
          if (res.data.data.length > 0) {
            setData(res?.data?.data);
            setDisabledNext(true);
            setTotalPages(res.data.total_pages);
          } else {
            setDisabledNext(false);
          }
        } else {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify(res?.data?.message)
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };

  useEffect(() => {
    getVendors();
  }, [pageView]);

  const filtervendor = (e) => {
    Http.GetAPI(
      process.env.REACT_APP_SEARCHVENDOR + "?" + `search=${e} & page=${pageNo}`,
      data,
      null
    )
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          setData(res?.data?.data);
          setDisabledNext(true);
          console.log("userr", res.data.data);
        } else {
          // alert("Fields not matched");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };
  const search = Debounce(filtervendor);
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "blueviolet",
                    border: "blueviolet",
                    borderRadius: "4px",
                    float: "right",
                    padding: "9px 19px",
                    color: "white",
                  }}
                  onClick={() => {
                    setShowAddVendor(true);
                  }}
                >
                  Add Vendors
                </button>

                <Card.Title as="h4">Vendors Manager</Card.Title>

                <p className="card-category">Vendors details and action</p>
                <br></br>
                <InputGroup style={{ width: "250px" }}>
                  <Input
                    placeholder="Search"
                    onChange={(e) => {
                      search(e);
                    }}
                  />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
                <br></br>
              </Card.Header>
              {isLoading ? (
                <Loading
                  isLoading={isLoading}
                  noData={data?.length == 0}
                  image={image}
                />
              ) : (
                <Card.Body className="table-full-width table-responsive px-0">
                  {data.length === 0 ? (
                    <img
                      style={{ marginLeft: "21em", marginBottom: "5em" }}
                      width={200}
                      height={200}
                      src={image}
                      alt="vendor data Image"
                    />
                  ) : (
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">ID</th>
                          <th className="border-0">Vendor Image</th>
                          <th className="border-0">Vendor Name</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Phone</th>
                          <th className="border-0">Status</th>
                          <th className="border-0">Login Count</th>
                          <th className="border-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr style={{ fontSize: "0.95rem" }} key={item.id}>
                            <td>{item.id}</td>
                            <td>
                              <img
                                src={item.user_image}
                                alt="image"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                              <div
                                style={{
                                  backgroundColor:
                                    item.active == "1" ? "green" : "red",
                                  border: "none",
                                  fontSize: "0.75rem",
                                  color: "white",
                                  padding: "3px 10px",
                                  borderRadius: "17px",
                                  display: "inline-block",
                                }}
                              >
                                {item.active == "1" ? "active" : "block"}
                              </div>
                            </td>
                            <td>{item.login_count}</td>
                            <td>
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="primary"
                                onClick={() => {
                                  setSelectedVendor(item);
                                  setShowUpdateModal(true);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>

                              {item?.active == "1" && (
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
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              )}
            </Card>
            {isLoading ? (
              ""
            ) : (
              <Pagenate
                currentPage={pageView}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setPageView(page);
                }}
              />
            )}
          </Col>
        </Row>

        <UpdateVendor
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          item={selectedVendor}
          getVendors={getVendors}
        />
        <AddVendor
          showAddVendor={showAddVendor}
          setShowAddVendor={setShowAddVendor}
          getVendors={getVendors}
        />
        <BlockVendor
          showModal={showModal}
          setShowModal={setShowModal}
          blockData={blockData}
          getVendors={getVendors}
        />
      </Container>
    </>
  );
};

export default VendorsManager;
