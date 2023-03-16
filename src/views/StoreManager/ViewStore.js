import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "../../assets/css/day.css";
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
const ViewStore = ({ showDetailsModal, setShowDetailsModal, rowData }) => {
  const [days, setDays] = useState([]);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  useEffect(() => {
    if (rowData.opening_days) {
      let parsedDays;
      if (Array.isArray(rowData.opening_days)) {
        parsedDays = rowData.opening_days;
        parsedDays = JSON.parse(rowData.opening_days);
      } else if (typeof rowData.opening_days === "string") {
        parsedDays = rowData.opening_days.split(",");
      }
      setDays(parsedDays);
    }
  }, [rowData]);

  return (
    <>
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header style={{ borderBottom: "1px solid gray" }}>
          <Modal.Title className="title">View Store Details</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => setShowDetailsModal(false)}
          />
        </Modal.Header>

        <Modal.Body className="body">
          <Table striped bordered className="table">
            <tbody>
              <tr>
                <td className="bold-col">Vendor ID:</td>
                <td>{rowData.vendor_id}</td>
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
                <td>{rowData.store_name}</td>
              </tr>
              <tr>
                <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                  Store Description:
                </td>
                <td>{rowData.store_desc}</td>
              </tr>
              <tr>
                <td className="bold-col" style={{ whiteSpace: "nowrap" }}>
                  Store Address:
                </td>
                <td>{rowData.store_address}</td>
              </tr>
              <tr>
                <td className="bold-col">Pincode:</td>
                <td>{rowData.pincode}</td>
              </tr>
              <tr>
                <td className="bold-col">City:</td>
                <td>{rowData.city}</td>
              </tr>
              <tr>
                <td className="bold-col">State:</td>
                <td>{rowData.state}</td>
              </tr>
              <tr>
                <td className="bold-col">Country:</td>
                <td>{rowData.country}</td>
              </tr>
              <tr>
                <td className="bold-col">Opening Days:</td>
                <td>
                  {days.map((day, index) => (
                    <div key={day} className={`week-days`}>
                      {daysOfWeek[index] || day}
                    </div>
                  ))}
                </td>
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
                <td className="bold-col">Store Created:</td>
                <td>{rowData.created_at}</td>
              </tr>
              <tr>
                <td className="bold-col">Store Updated:</td>
                <td>{rowData.updated_at}</td>
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
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginTop: "33px",
              }}
            >
              Vendor Details
            </div>
            <Table striped bordered className="table">
              <tbody>
                <tr>
                  <td className="bold-col">Vendor Id:</td>
                  <td>{rowData.vendor_id}</td>
                </tr>
                <tr>
                  <td className="bold-col">Vendor Image:</td>
                  <td>
                    <img
                      src={rowData.user_image}
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
                  <td className="bold-col">Vendor Name:</td>
                  <td>{rowData.name}</td>
                </tr>
                <tr>
                  <td className="bold-col">Vendor Email:</td>
                  <td>{rowData.email}</td>
                </tr>
                <tr>
                  <td className="bold-col">Vendor Phone:</td>
                  <td>{rowData.phone}</td>
                </tr>

                <tr>
                  <td className="bold-col"> Vendor Status:</td>

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
    </>
  );
};
export default ViewStore;
