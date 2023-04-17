import React, { useState, useEffect, useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup, SelectPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import Loading from "customComponents/Loading";
import "../../assets/css/modal.css";
import "../../assets/css/day.css";
import UpdateStore from "./UpdateStore";
import AddStore from "./AddStore";
import MAPDays from "./MAPDays";
import Pagenate from "../../components/Pagenate";
import { Utils } from "CommonUtils/Utils";
import "./Store.css";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import image from "assets/img/noStore.png";

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
import BlockStore from "./BlockStore";
const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

const StoreManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [data, setData] = useState([]);
  const [showAddStore, setShowAddStore] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [blockStore, setBlockStore] = useState([]);
  const [showUpdateStore, setShowUpdateStore] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeAdded, setAddStored] = useState(false);
  const [days, setDays] = useState([]);
  const { pageNo, setDisabledNext, pageView, setPageView } = useContext(Utils);
  const [totalPages, setTotalPages] = useState(1);
  const notificationAlertRef = React.useRef(null);
  let parseDays;
  let VendorData;

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

  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

  const getStore = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETSTOREDATA + "?" + `page=${pageView}`,
      data
    )
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          if (res.data.data.length > 0) {
            setTotalPages(res.data.total_pages);
            setData(res?.data?.data);
            setAddStored(false);
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
    getStore();
  }, [pageView]);

  const handlePageChange = (page) => {
    setPageView(page);
    getStore();
  };

  const filtervendor = (e) => {
    Http.GetAPI(
      process.env.REACT_APP_SEARCHSTORE + "?" + `search=${e}`,
      "",
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          if (res.data.data.length > 0) {
            setData(res?.data?.data);
            setDisabledNext(true);
          } else {
            setDisabledNext(false);
          }
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
                    setShowAddStore(true);
                  }}
                >
                  Add Stores
                </button>
                <Card.Title as="h4">Store Manager</Card.Title>
                <p className="card-category">Store details and action</p>
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
                  <Table
                    responsive="xl"
                    style={{
                      tableLayout: "fixed",
                      width: "100%",
                      display: "block",
                      overflowX: "scroll",
                    }}
                    className="table-hover table-striped"
                  >
                    <thead>
                      <tr>
                        <th className="border-0">Store ID</th>
                        <th className="border-0">Vendor ID</th>
                        <th className="border-0">Store Image</th>
                        <th className="border-0">Store Name</th>
                        <th className="border-0">Store Description</th>
                        <th className="border-0">Store Address</th>
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
                          <td title={item.store_name}>{item.vendor_id}</td>
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
                            {item.store_name.slice(0, 10)}
                          </td>
                          <td title={item.store_desc}>
                            {item.store_desc.slice(0, 14)}
                          </td>
                          <td title={item.store_address}>
                            {item.store_address.slice(0, 14)}
                          </td>
                          <td>{item.pincode}</td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>{item.country}</td>
                          <td
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "Center",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            {item.opening_days.split(",").map((ele, index) => (
                              <div
                                key={index}
                                className="day-circle"
                                style={{
                                  marginTop: "20px",
                                  width: "15px",
                                  height: "15px",
                                  background: "lightgray",
                                  color: "black",
                                }}
                              >
                                {daysOfWeek[index] || ele}
                              </div>
                            ))}
                            {/* */}
                          </td>
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

                              {item?.active == "1" && (
                                <Button
                                  className="btn-simple btn-link p-1"
                                  type="button"
                                  variant="danger"
                                  // disabled={storeBlocked

                                  onClick={() => {
                                    setShowModal(true);
                                    setBlockData(item.id);
                                  }}
                                >
                                  <i className="fas fa-times"></i>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
        {isLoading ? (
          ""
        ) : (
          <Pagenate totalPages={totalPages} onChange={handlePageChange} />
        )}
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
      <ViewStore
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        rowData={rowData}
      />
      <BlockStore
        showModal={showModal}
        setShowModal={setShowModal}
        blockData={blockData}
        getStore={getStore}
      />
    </>
  );
};

export default StoreManager;
