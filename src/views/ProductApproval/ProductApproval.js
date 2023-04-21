import React, { useState, useEffect, useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import Paginte from "components/Paginate";
import { Utils } from "CommonUtils/Utils";
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
import VerifyProduct from "./VerifyProduct";
import ViewProduct from "./ViewProduct";
import RejectProduct from "./RejectProduct";
import "../../assets/css/TableCss.css";

const ProductApproval = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerifiedProduct, setShowVerifiedProduct] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showRejectProduct, setShowRejectProduct] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { pageNo, setDisabledNext, pageView } = useContext(Utils);
  const [rowData, setRowData] = useState([]);
  const [product, setProduct] = useState([]);
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

  const getUnverifiedProduct = () => {
    Http.GetAPI(
      process.env.REACT_APP_GETUNVERIFIEDPRODUCTS + "?" + `page=${pageView}`,
      "",
      null
    )
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          if (res.data.data.length > 0) {
            setData(res?.data?.data);
            setTotalPages(res.data.total_pages);
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
    getUnverifiedProduct();
  }, [pageView]);

  const filtervendor = (e) => {
    Http.GetAPI(
      process.env.REACT_APP_SEARCHPRODUCTAPPOVAL +
        "?" +
        `search=${e} & page=${pageNo}`,
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
                <Card.Title as="h4">Products Approval</Card.Title>

                <p className="card-category">Products details and action</p>
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
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr style={{ dislay: "flex", justifyContent: "center" }}>
                        <th className="border-0">ID</th>
                        <th className="border-0">Product Image</th>
                        <th className="border-0">Product Name</th>
                        <th className="border-0 ">Action</th>
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
                                setShowProductDetail(true);
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
              )}
            </Card>
          </Col>
        </Row>
        {isLoading ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Paginte pages={totalPages} />
          </div>
        )}

        <VerifyProduct
          showVerifiedProduct={showVerifiedProduct}
          setShowVerifiedProduct={setShowVerifiedProduct}
          product={product}
          getUnverifiedProduct={getUnverifiedProduct}
        />

        <ViewProduct
          showProductDetail={showProductDetail}
          setShowProductDetail={setShowProductDetail}
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
