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
                <td className="bold-col">Id:</td>
                <td>{rowData.id}</td>
              </tr>
              <tr>
                <td className="bold-col">Image:</td>
                <td>
                  <img
                    src={rowData.p_images}
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
                <td className="bold-col">Store Status:</td>
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
                  {rowData.active == "1" ? "verified" : "unverified"}
                </td>
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
                <td className="bold-col">Product Created:</td>
                <td>{rowData.p_created}</td>
              </tr>
              <tr>
                <td className="bold-col">Product Modified:</td>
                <td>{rowData.p_modified}</td>
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
                <td className="bold-col">Stock:</td>
                <td>{rowData.in_stock}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default ProductDetailModel;
