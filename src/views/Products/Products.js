import React, { useState, useEffect } from "react";
import SearchIcon from "@rsuite/icons/Search";
import { Input, InputGroup } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { BiBlock } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import UpdateProducts from "./UpdateProducts";
import AddProduct from "./AddProduct";

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
  const [blockProducts, setBlockProducts] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);

  const getProducts = () => {
    Http.GetAPI(apis.getProducts + "?" + Math.random(), data, null)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          // console.log(res?.data?.data,"productdata")
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
  useEffect(() => {
    getProducts();
  }, []);
  // console.log(blockData);
  const handleBlockProducts = (e) => {
    
    var data = new FormData();
    data.append("product_id", blockData);
    console.log("usersss", data);
    Http.PostAPI(apis.blockProducts, data, null)
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
                  <Input placeholder="Search" />
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
                      <th className="border-0">UPloader Vendor ID</th>
                      <th className="border-0">Products Name</th>
                      <th className="border-0">Products Description</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">SubCategory</th>
                      <th className="border-0"> buy</th>
                      <th className="border-0">Pickup</th>
                      <th className="border-0"></th>
                      {/* <th className="border-0"></th> */}
                      <th className="border-0">Total Clicks</th>
                      <th className="border-0">Verified</th>
                      <th className="border-0"> Created</th>
                      <th className="border-0">Modified</th>
                      <th className="border-0">Category Name</th>
                      <th className="border-0">SubCategory Name</th>
                      <th className="border-0">Color</th>
                      <th className="border-0">Size</th>
                      <th className="border-0">Status</th>
                      <th className="border-0"></th>
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
                            alt={item.product_name}
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
                        {/* <td title={item.product_address}>
                          {item.product_address.slice(0, 10)}
                        </td> */}
                        <td>{item.category}</td>
                        <td>{item.sub_category}</td>
                        <td>{item.is_buy}</td>
                        <td>{item.is_pickup}</td>
                        <td>{item.total_clicks}</td>
                        <td>{item.is_verified}</td>
                        <td>{item.category_name}</td>
                        <td>{item.subcategory_name}</td>
                        <td>{item.is_color}</td>
                        <td>{item.is_size}</td>
                        <td>{item.price}</td>
                        <td>{item.discount_price}</td>

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
                                setShowUpdateProduct(true);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </Button> 
                            <Button
                            index= {item.id}
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
                              <i className="fas fa-times"
                              id={item.id}

                              ></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <UpdateProducts
          showUpdateProduct={showUpdateProduct}
          setShowUpdateProduct={setShowUpdateProduct}
          item={selectedProducts}
          getProducts={getProducts}
        /> 
       <AddProduct
          showAddProduct={showAddProduct}
          setShowAddproduct={setShowAddProduct}
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

       <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
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
                    src={rowData.product_image}
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
                <td>{rowData.category}</td>
              </tr>
              <tr>
                <td className="bold-col">SubCategory:</td>
                <td>{rowData.sub_category}</td>
              </tr>
              <tr>
                <td className="bold-col">Is buy:</td>
                <td>{rowData.is_buy}</td>
              </tr>
              <tr>
                <td className="bold-col">Is Pickup:</td>
                <td>{rowData.is_pickup}</td>
              </tr>
              <tr>
                <td className="bold-col">Verified:</td>
                <td>{rowData.is_verified}</td>
              </tr>
              <tr>
                <td className="bold-col">Opening Time:</td>
                <td>{rowData.opening_time}</td>
              </tr>

              <tr>
                <td className="bold-col">Closing Time:</td>
                <td>{rowData.closing_time}</td>
              </tr>

              <tr>
                <td className="bold-col">Total Clicks:</td>
                <td>{rowData.total_clicks}</td>
              </tr>
              <tr>
                <td className="bold-col">Product Created:</td>
                <td>{rowData.category_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Product Updated:</td>
                <td>{rowData.subcategory_name}</td>
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
        </Modal.Body>
        <Modal.Footer></Modal.Footer> 
      </Modal>   
      </Container>
    </>
  );
};

export default Products;
