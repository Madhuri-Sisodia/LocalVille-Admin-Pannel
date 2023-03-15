import React, { useState, useEffect,useContext } from "react";
import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { BiBlock } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import UpdateProducts from "./UpdateProducts";
import AddProduct from "./AddProduct";
import Paginte from "../../components/Paginate";
import { Utils } from "CommonUtils/Utils";

console.log("hello");

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
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [blockProducts, setBlockProducts] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const {pageNo,setDisabledNext,pageView} = useContext(Utils)

  const verifiedProduct = (verify) => {
    if (verify == 2) {
      return "Rejected";
    } else if (verify == 1) {
      return "Verified";
    } else {
      return "Pending";
    }
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

  const getProducts = () => {
    console.log("helloget")
    Http.GetAPI(process.env.REACT_APP_GETPRODUCTS + "?" + `page=${pageView}`, "", null)
      .then((res) => {
        if (res?.data?.status) {
          setTotalPages(res.data.total_pages);
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
    getProducts();
  }, [pageView]);
  // console.log(blockData);
  const handleBlockProducts = (e) => {
    var data = new FormData();
    data.append("product_id", blockData);
    console.log("usersss", data);
    Http.PostAPI(process.env.REACT_APP_BLOCKPRODUCTS, data, null)
      .then((res) => {
        console.log("user", res);
        if (res?.data?.status) {
          setBlockProducts(res?.data?.data);
          getProducts();
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  const filtervendor = (e) => {
    Http.GetAPI(
      process.env.REACT_APP_SEARCHPRODUCT + "?" + `search=${e}`,
      "",
      null
    )
      .then((res) => {
        if (res?.data?.status) {
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

  const search = Debounce(filtervendor);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Button
                  className="btn-fill float-right"
                  style={{
                    backgroundColor: "blueviolet",
                    borderColor: "blueviolet",
                  }}
                  type="submit"
                  onClick={() => {
                    setShowAddProduct(true);
                  }}
                >
                  Add Products
                </Button>
                <Card.Title as="h4">Product Manager</Card.Title>
                <p className="card-category">product details and action</p>
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
                      <th className="border-0">Uploader Vendor ID</th>
                      <th className="border-0">Products Image</th>
                      <th className="border-0">Products Name</th>
                      <th className="border-0">Products Description</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">SubCategory</th>
                      <th className="border-0"> buy</th>
                      <th className="border-0">Pickup</th>
                      <th className="border-0">Total Clicks</th>
                      <th className="border-0">Verified</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Category Name</th>
                      <th className="border-0">SubCategory Name</th>
                      <th className="border-0">Color</th>
                      <th className="border-0">Size</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Discounted Price</th>
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
                            alt={item.product_image}
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
                        <td>{item.category_name}</td>
                        <td>{item.subcategory_name}</td>
                        <td>{item.is_buy == 1 ? "Yes" : "No"}</td>
                        <td>{item.is_pickup == 1 ? "Yes" : "No"}</td>
                        <td>{item.total_clicks}</td>
                        <td>{verifiedProduct(item.is_verified)}</td>
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
                        <td>{item.category_name}</td>
                        <td>{item.subcategory_name}</td>
                        <td>{item.is_color == 1 ? "Yes" : "No"}</td>
                        <td>{item.is_size == 1 ? "Yes" : "No"}</td>
                        <td>{item.price}</td>
                        <td>{item.discount_price}</td>

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
                              }}
                            >
                              <i className="fa fa-eye"></i>
                            </Button>
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="primary"
                              onClick={() => {
                                setSelectedProducts(item);
                                setShowUpdateModal(true);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </Button>
                            <Button
                              index={item.id}
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={(e) => {
                                setShowModal(true);
                                // setShowDetailsModal(false);
                                setBlockData(e.target.id);
                                console.log(e.target.id);
                              }}
                            >
                              <i className="fas fa-times" id={item.id}></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Paginte pages={totalPages} />
            </div>
          </Col>
        </Row>
        <UpdateProducts
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          item={selectedProducts}
          getProducts={getProducts}
        />
        <AddProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
          getProducts={getProducts}
        />
        <Modal
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <BiBlock
                style={{
                  fontSize: "30px",
                  color: "gray",
                }}
              />
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Are you sure you want to block this Product?</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              //  id= {item.id}
              className="btn-simple"
              variant="danger"
              onClick={() => {
                handleBlockProducts(blockData);
                setShowModal(false);
              }}
            >
              Block
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>

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
                  <td className="bold-col">Uploader Vendor ID:</td>
                  <td>{rowData.uploader_vendor_id}</td>
                </tr>
                <tr>
                  <td className="bold-col">Product Image:</td>
                  <td>
                    <img
                      src={rowData.theme_img}
                      alt={rowData.product_name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bold-col">Product Name:</td>
                  <td>{rowData.product_name}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    Product Description:
                  </td>
                  <td>{rowData.product_desc}</td>
                </tr>
                <tr>
                  <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                    Category
                  </td>
                  <td>{rowData.category_name}</td>
                </tr>
                <tr>
                  <td className="bold-col">SubCategory:</td>
                  <td>{rowData.subcategory_name}</td>
                </tr>
                <tr>
                  <td className="bold-col">Is buy:</td>
                  <td>{rowData.is_buy == "1" ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="bold-col">Is Pickup:</td>
                  <td>{rowData.is_pickup == "1" ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="bold-col">Total Clicks:</td>
                  <td>{rowData.total_clicks}</td>
                </tr>
                <tr>
                  <td className="bold-col">Product Status:</td>
                  <td
                    style={{
                      backgroundColor:
                        rowData.is_verified == "1"
                          ? "green"
                          : rowData.is_verified == "0"
                          ? "orange"
                          : "red",
                      border: "none",
                      fontSize: "0.75rem",
                      color: "white",
                      padding: "0px 7px",
                      borderRadius: "17px",
                      display: "inline-block",
                    }}
                  >
                    {rowData.is_verified == "1"
                      ? "verified"
                      : rowData.is_verified == "0"
                      ? "pending"
                      : "rejected"}
                  </td>
                </tr>

                <tr>
                  <td className="bold-col">Status:</td>

                  <td
                    style={{
                      backgroundColor: rowData.active == "1" ? "green" : "red",
                      border: "none",
                      fontSize: "0.75rem",
                      color: "white",
                      padding: "0px 7px",
                      borderRadius: "17px",
                      display: "inline-block",
                    }}
                  >
                    {rowData.active == "1" ? "active" : "block"}
                  </td>
                </tr>
              </tbody>
            </Table>
            {rowData.images && rowData.images.length > 0 && (
              <div>
                <img
                  src={rowData.images[0].images}
                  alt="image"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Products;
