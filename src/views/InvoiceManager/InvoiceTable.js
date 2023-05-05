import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup } from "rsuite";
import { Http } from "../../config/Service";
import { Utils } from "CommonUtils/Utils";
import "../../assets/css/admin.css";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import NotificationAlert from "react-notification-alert";
import Loading from "customComponents/Loading";
import image from "assets/img/pdf-icon.png";
import ButtonComponent from "views/ButtonComponent";
import Pagenate from "../../components/Pagenate";


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
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import BlockInvoice from "./BlockInvoice";

const InvoiceTable = () => {
  const [data, setData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { pageNo, setDisabledNext, pageView, setPageView } = useContext(Utils);
  const notificationAlertRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);


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

  const filtervendor = (e) => {
    Http.GetAPI(
      process.env.REACT_APP_SEARCHINVOICE + "?" + `search=${e}`,
      "",
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
          getInvoice();
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


  const getInvoice = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETINVOICE + "?" + `page=${pageView}`,
      "",
      null
    )
      .then((res) => {
        setIsLoading(false);
        // console.log("all data", res?.data);
        // setIsLoading(false);

        if (res?.data?.status) {
          setData(res?.data?.data?.invoices);
          setTotalPages(res?.data?.data?.total_pages);
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
    getInvoice();
  }, [pageView]);

  const handlePageChange = (page) => {
    setPageView(page);
    getInvoice();
  };



  const search = Debounce(filtervendor)

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
                <Card.Title as="h4">Invoice Manager</Card.Title>
                <p className="card-category">Invoice details and action</p>
                <br></br>
                <InputGroup style={{ width: "250px" }}>
                  <Input placeholder="Search"
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
                  <Table
                    responsive="xl"
                    style={{
                      tableLayout: "fixed",
                      width: "100%",
                      overflowX: "scroll",
                      // display: "block",
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
                        <th className="border-0">Status</th>
                        <th className="border-0">PDF Icon</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item) => (
                        <tr
                          style={{
                            fontSize: "0.90rem",
                            maxHeight: "1em",
                            overflow: "hidden",
                          }}
                        >
                          <td>{item?.id}</td>
                          <td>{item?.invoice_id}</td>
                          <td>{item?.vendor_id}</td>
                          <td>{item?.party_name}</td>
                          <td>{item?.store_name}</td>
                          <td>{item?.gst}</td>
                          <td>{item?.mrp_total}</td>
                          <td>
                            <div
                              style={{
                                backgroundColor:
                                  item?.active == "1" ? "green" : "red",
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
                            <a href={item.invoice_url}>
                              <img
                                src={image}
                                alt={image}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />
                            </a>
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
                                variant="primary"
                                onClick={() => {
                                  setShowDetailsModal(true);
                                  setRowData(item);
                                  {
                                    console.warn(rowData);
                                  }
                                }}
                              >
                                <i className="fa fa-eye"></i>
                              </Button>

                              {/* <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button> */}

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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              )}
            </Card>
            {/* </Col>
        </Row> */}
            {isLoading ? (
              ""
            ) : (
              <Pagenate totalPages={totalPages} onChange={handlePageChange} />
            )}
          </Col>
        </Row>

        <BlockInvoice
          showModal={showModal}
          setShowModal={setShowModal}
          blockData={blockData}
          getInvoice= {getInvoice}
        />
        <Modal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
        >
          <Modal.Header style={{ borderBottom: "1px solid gray" }}>
            <Modal.Title className="title">View Product Details</Modal.Title>
            <MdClose
              className="close-icon"
              onClick={() => setShowDetailsModal(false)}
            />
          </Modal.Header>

          <Modal.Body className="body">
            <Table striped bordered className="table">
              <tbody>
                <tr>
                  <td className="bold-col">Invoice_Id:</td>
                  <td>{rowData.invoice_id}</td>
                </tr>
                <tr>
                  <td className="bold-col">Product_Id:</td>
                  <td>{rowData?.products?.[0]?.product_id}</td>
                </tr>
                <tr>
                  <td className="bold-col">Product Name:</td>
                  <td>{rowData?.products?.[0]?.product_name}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    attr_id:
                  </td>
                  <td>{rowData?.products?.[0]?.attr_id}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    Quantity:
                  </td>
                  <td>{rowData?.products?.[0]?.qty}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    gst:
                  </td>
                  <td>{rowData?.products?.[0]?.gst}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    mrp:
                  </td>
                  <td>{rowData?.products?.[0]?.mrp}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    discounted_pric:
                  </td>
                  <td>{rowData?.products?.[0]?.discounted_price}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    active:
                  </td>
                  <td>{rowData?.products?.[0]?.active}</td>
                </tr>
              </tbody>
            </Table>
            <a
              style={{
                display: "inline-block",
                padding: "6px 8px",
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
                textDecoration: "none",
                color: "#fff",
                backgroundColor: "#8a2be2",
                borderRadius: "5px",
              }}
              target="_self"
              // download
              download={`${rowData.invoice_url}.pdf`}
              // href={`${rowData.invoice_url}`}
              href="https://localville.in/apis/seller_api/invoice_pdf/1680861388V1S134.pdf"
              rel="noopener noreferrer"
              type="application/pdf"
            >
              Download Pdf
            </a>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default InvoiceTable;
