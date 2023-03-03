import React, { useState } from "react";
import { MdClose } from "react-icons/md";
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
const ViewProduct = ({
  showProductDetails,
  setShowProductDetails,
  rowData,
}) => {
  return (
    <>
      <Modal
        show={showProductDetails}
        onHide={() => setShowProductDetails(false)}
      >
        <Modal.Header style={{ borderBottom: "1px solid gray" }}>
          <Modal.Title className="title">View Product Details</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => setShowProductDetails(false)}
          />
        </Modal.Header>

        <Modal.Body className="body">
          <Table striped bordered className="table">
            <tbody>
              <tr>
                <td className="bold-col">ID:</td>
                <td>{rowData.id}</td>
              </tr>
              <tr>
                <td className="bold-col">Theme Image:</td>
                <td>
                  <img
                    src={rowData.theme_img}
                    alt="image"
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
                <td className="bold-col">Category:</td>
                <td>{rowData.category}</td>
              </tr>
              <tr>
                <td className="bold-col">Sub Category:</td>
                <td>{rowData.sub_category}</td>
              </tr>
              <tr>
                <td className="bold-col">Buy:</td>
                <td>{rowData.is_buy}</td>
              </tr>
              <tr>
                <td className="bold-col">Pick Up:</td>
                <td>{rowData.is_pickup}</td>
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
                <td>{rowData.active}</td>
              </tr>
              <tr>
                <td className="bold-col">Created At:</td>
                <td>{rowData.created_at}</td>
              </tr>
              <tr>
                <td className="bold-col">Modified At:</td>
                <td>{rowData.modified_at}</td>
              </tr>

              <tr>
                <td className="bold-col">Category Name:</td>
                <td>{rowData.category_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Sub Category Name:</td>
                <td>{rowData.subcategory_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Color:</td>
                <td>{rowData.is_color}</td>
              </tr>
              <tr>
                <td className="bold-col">Size:</td>
                <td>{rowData.is_size}</td>
              </tr>

              <tr>
                <td className="bold-col">Price:</td>
                <td>{rowData.price}</td>
              </tr>
              <tr>
                <td className="bold-col">Discount Price:</td>
                <td>{rowData.discount_price}</td>
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
    </>
  );
};
export default ViewProduct;
