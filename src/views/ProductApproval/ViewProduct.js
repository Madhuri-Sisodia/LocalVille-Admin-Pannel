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
                <td className="bold-col">Vendor ID:</td>
                <td>{rowData.id}</td>
              </tr>
              <tr>
                <td className="bold-col">Store Image:</td>
                <td>
                  <img
                    src={rowData.store_image}
                    alt={rowData.store_name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="bold-col">Store Name:</td>
                <td>{rowData.product_name}</td>
              </tr>
              <tr>
                <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                  Store Description:
                </td>
                <td>{rowData.product_desc}</td>
              </tr>
              <tr>
                <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                  Store Address:
                </td>
                <td>{rowData.category}</td>
              </tr>
              <tr>
                <td className="bold-col">Pincode:</td>
                <td>{rowData.sub_category}</td>
              </tr>
              <tr>
                <td className="bold-col">City:</td>
                <td>{rowData.is_buy}</td>
              </tr>
              <tr>
                <td className="bold-col">City:</td>
                <td>{rowData.is_pickup}</td>
              </tr>
              <tr>
                <td className="bold-col">City:</td>
                <td>{rowData.total_clicks}</td>
              </tr>
              <tr>
                <td className="bold-col">City:</td>
                <td>{rowData.is_verified}</td>
              </tr>
              <tr>
                <td className="bold-col">City:</td>
                <td>{rowData.active}</td>
              </tr>
              <tr>
                <td className="bold-col">State:</td>
                <td>{rowData.created_at}</td>
              </tr>
              <tr>
                <td className="bold-col">Country:</td>
                <td>{rowData.modified_at}</td>
              </tr>

              <tr>
                <td className="bold-col">Opening Time:</td>
                <td>{rowData.category_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Opening Time:</td>
                <td>{rowData.subcategory_name}</td>
              </tr>
              <tr>
                <td className="bold-col">Opening Time:</td>
                <td>{rowData.is_color}</td>
              </tr>
              <tr>
                <td className="bold-col">Opening Time:</td>
                <td>{rowData.is_size}</td>
              </tr>

              <tr>
                <td className="bold-col">Closing Time:</td>
                <td>{rowData.theme_img}</td>
              </tr>

              <tr>
                <td className="bold-col">Total Clicks:</td>
                <td>{rowData.price}</td>
              </tr>
              <tr>
                <td className="bold-col">Store Created:</td>
                <td>{rowData.discount_price}</td>
              </tr>
              <tr>
                <td className="bold-col">Store Updated:</td>
                <td>{rowData.images?.images}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default ViewProduct;
