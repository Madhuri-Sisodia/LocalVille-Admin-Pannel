import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/modal.css";

import { Modal, Table } from "react-bootstrap";

const ViewStoreDetails = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [data, setData] = useState([]);

  const [rowData, setRowData] = useState([]);

  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

  const getStore = () => {
    Http.GetAPI(apis.getUnverifiedStore + "?" + Math.random(), data, null)
      .then((res) => {
        if (res?.data?.status) {
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
    getStore();
  }, []);

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
                <td
                  style={{
                    backgroundColor:
                      rowData.opening_days == "[1,2,3,4,5,6]" ? "red" : "white",
                    border: "none",
                    height: "20px",
                    width: "20px",
                    fontSize: "0.75rem",
                    color: "white",
                    padding: " 10px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                >
                  {rowData.opening_days == "[1,2,3,4,5,6]"
                    ? "M,T,W,TH,F,S"
                    : "S"}
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
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewStoreDetails;
