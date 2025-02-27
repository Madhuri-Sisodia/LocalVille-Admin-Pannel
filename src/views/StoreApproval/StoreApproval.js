import React, { useState, useEffect, useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import { MdLocationPin } from "react-icons/md";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import Pagenate from "components/Pagenate";
import { Utils } from "CommonUtils/Utils";
import NotificationAlert from "react-notification-alert";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Loading from "customComponents/Loading";
import image from "assets/img/noStore.png";
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
  const [isPageViewSet, setIsPageViewSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerifiedStore, setShowVerifiedStore] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectStore, setShowRejectStore] = useState(false);
  const [storeApproval, setStoreApproval] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [rowData, setRowData] = useState([]);
  const [store, setStore] = useState([]);
  const { pageNo, setDisabledNext, pageView, setPageView } = useContext(Utils);

  const notificationAlertRef = React.useRef(null);
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

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

  const handlePageChange = (page) => {
    setPageView(page);
    getUnverifiedStore();
  };

  const getUnverifiedStore = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETUNVERIFIEDSTORE + "?" + `page=${pageView}`,
      data,
      null
    )
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          setData(res?.data?.data);
          setTotalPages(res.data.total_pages);
          setStoreApproval(false);
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
    if (!isPageViewSet) {
      setPageView(1);
      setIsPageViewSet(true);
    }
    getUnverifiedStore();
  }, [pageView, isPageViewSet]);
 

  const filterStoreApproval = (e) => {
    Http.GetAPI(
      process.env.REACT_APP_STOREAPPROVALSEARCH +
        "?" +
        `search=${e}`,"",
      // data,
      null
    )
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          setData(res?.data?.data);
          setDisabledNext(true);
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
  const search = Debounce(filterStoreApproval);
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
                <Card.Title as="h4">Store Approval</Card.Title>

                <p className="card-category">Stores details and action</p>
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
                <Loading isLoading={isLoading} noData={data?.length == 0} />
              ) : (
                <Card.Body className="table-full-width table-responsive px-0">
                  {data.length === 0 ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        width={200}
                        height={200}
                        src={image}
                        alt="store data Image"
                      />
                    </div>
                  ) : (
                    <Table
                      className="table-hover table-striped"
                      responsive="xl"
                      style={{
                        width: "100%",
                        textAlign: "center",
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
                              {item.opening_days
                                .split(",")
                                .map((ele, index) => (
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
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="primary"
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
                                variant="success"
                                onClick={() => {
                                  setShowVerifiedStore(true);
                                  setStore(item);
                                }}
                              >
                                <i className="fa fa-check"></i>
                              </Button>

                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                                onClick={() => {
                                  setShowRejectStore(true);
                                  setStore(item);
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </Button>
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
              <Pagenate totalPages={totalPages} onChange={handlePageChange} />
            )}
          </Col>
        </Row>

        <VerifiedStore
          showVerifiedStore={showVerifiedStore}
          setShowVerifiedStore={setShowVerifiedStore}
          store={store}
          getUnverifiedStore={() => getUnverifiedStore()}
        />

        <ViewStoreDetails
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
          rowData={rowData}
        />
        <RejectStore
          showRejectStore={showRejectStore}
          setShowRejectStore={setShowRejectStore}
          getUnverifiedStore={() => getUnverifiedStore()}
          store={store}
        />
      </Container>
    </>
  );
};

export default StoreApproval;
