import React from "react";
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
const ProductDetailModel = ({
  showProductDetail,
  setShowProductDetail,
  rowData,
}) => {
  return (
    <>
      <Modal
        show={showProductDetail}
        onHide={() => setShowProductDetail(false)}
      >
        <Modal.Header style={{ borderBottom: "1px solid gray" }}>
          <Modal.Title className="title">Product Detail</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => setShowProductDetail(false)}
          />
        </Modal.Header>

        <Modal.Body className="body">
          <Table striped bordered className="table">
            <tbody>
              <tr>
                <td className="bold-col">Uploader Vendor Id:</td>
                <td>{rowData.uploader_vendor_id}</td>
              </tr>
              <tr>
                <td className="bold-col">Product Id:</td>
                <td>{rowData.id}</td>
              </tr>
              <tr>
                <td className="bold-col">Product Image:</td>
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
                <td>{rowData.category_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Sub Category:</td>
                <td>{rowData.subcategory_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Buy:</td>
                <td>{rowData.is_buy == "1" ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="bold-col">Pick Up:</td>
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
                <td className="bold-col"> Status:</td>

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
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginTop: "33px",
            }}
          >
            Attributes
          </div>
          <Table striped bordered className="table">
            <tbody>
              {rowData?.attributes?.map((attr, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="bold-col">ID:</td>
                    <td>{attr.id}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Product ID:</td>
                    <td>{attr.pid}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Quantity:</td>
                    <td>{attr.qty}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Sku:</td>
                    <td>{attr.sku?.[index]}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Color:</td>
                    <td>{attr.color?.[index]?.name}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Size:</td>
                    <td>{attr.size?.[index]?.name}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Price:</td>
                    <td>{attr.price}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">DiscountPrice:</td>
                    <td>{attr.discount_price}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Stock:</td>
                    <td>{attr.in_stock}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Created At:</td>
                    <td>{attr.created_at}</td>
                  </tr>

                  <tr>
                    <td className="bold-col">Modified At:</td>
                    <td>{attr.modified_at}</td>
                  </tr>

                  <tr>
                    <td className="bold-col"> Status:</td>
                    <td
                      style={{
                        backgroundColor: attr.active == "1" ? "green" : "red",
                        border: "none",
                        fontSize: "0.75rem",
                        color: "white",
                        padding: "0px 7px",
                        borderRadius: "17px",
                        display: "inline-block",
                      }}
                    >
                      {attr.active == "1" ? "active" : "block"}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          {rowData.images && rowData.images.length > 0 && (
            <div>
              {rowData.images.map((image, index) => (
                <img
                  key={index}
                  src={image.images?.[index]}
                  alt="image"
                  style={{
                    width: "70px",
                    height: "70px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default ProductDetailModel;
