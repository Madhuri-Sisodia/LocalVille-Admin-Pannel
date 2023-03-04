import React, { useState, useEffect,useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { MdBlock } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import "../../assets/css/modal.css";
import "../../assets/css/day.css";
import UpdateStore from "./UpdateStore";
import AddStore from "./AddStore";
import MAPDays from "./MAPDays";
import Paginate from "../../components/Paginate";
import { Utils } from "CommonUtils/Utils";
import "./Store.css"


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
import ViewProduct from "views/ProductApproval/ViewProduct";
import ViewStore from "./ViewStore";

// const data = [
//   {
//     vendor_id: 1,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 1",
//     store_description: "This is the description for Store 1",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Friday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "active",
//   },
//   {
//     vendor_id: 2,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 2",
//     store_description: "This is the description for Store 2",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Saturday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "block",
//   },
//   {
//     vendor_id: 3,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 3",
//     store_description: "This is the description for Store 3",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Saturday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "block",
//   },
//   {
//     vendor_id: 4,
//     store_image: "https://dummyimage.com/300x200/000/fff",
//     store_name: "Store 4",
//     store_description: "This is the description for Store 4",
//     store_address: "123 Main Street",
//     pincode: "123456",
//     city: "New York",
//     state: "NY",
//     country: "USA",
//     opening_days: "Monday-Saturday",
//     opening_time: "9:00 AM",
//     closing_time: "5:00 PM",
//     total_clicks: "100",
//     store_created: "2022-01-01",
//     store_updated: "2022-02-01",
//     status: "block",
//   },
// ];

const StoreManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [data, setData] = useState([]);
  const [showAddStore, setShowAddStore] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [blockStore, setBlockStore] = useState([]);
  const [showUpdateStore, setShowUpdateStore] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [storeAdded,setAddStored] = useState(false)
  const [days, setDays] = useState([]);
  const {pageNo,setDisabledNext} = useContext(Utils)
  let parseDays;



  const getLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude}+${longitude}`;
    window.open(url);
  };

  const getStore = () => {
    console.log("hello")
    Http.GetAPI(apis.getStoreData + "?" + `page=${pageNo}`, "", null)
      .then((res) => {
        if (res?.data?.status) {
           if(res.data.data.length>0){
            setData(res?.data?.data);
            setAddStored(false)
           }
           else{
            setDisabledNext(false)
           }
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };
  console.log("data", data);
  useEffect(() => {
    getStore();
  }, [pageNo]);


  const handleBlockStore = (id) => {
    var data = new FormData();
    data.append("id", id);
    console.log("usersss", data);
    Http.PostAPI(apis.blockStore, data, null)
      .then((res) => {
        console.log("user", res);
        if (res?.data?.status) {
          setBlockStore(res?.data?.data);
          getStore();
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

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <>
      <Container fluid >
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "blueviolet",
                    border: "blueviolet",
                    borderRadius: "4px",
                    float: "right",
                    padding: "9px 19px",
                    color: "white",
                  }}
                  onClick={() => {
                    setShowAddStore(true);
                  }}
                >
                  Add Stores
                </button>
                <Card.Title as="h4">Store Manager</Card.Title>
                <p className="card-category">Store details and action</p>
                <br></br>
                <InputGroup style={{ width: "250px" }}>
                  <Input placeholder="Search" />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0" >
                <Table
                  responsive="xl"
                  style={{
                    tableLayout: "fixed",
                    width: "100%",
                    display: "block",
                    overflowX:"scroll",
                  }}
                  className="table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th className="border-0">Store ID</th>
                      <th className="border-0">Vendor ID</th>
                      <th className="border-0">Store Image</th>
                      <th className="border-0">Store Name</th>
                      <th className="border-0">Store Address</th>
                      <th className="border-0">Store Description</th>
                      <th className="border-0">Pincode</th>
                      <th className="border-0">City</th>
                      <th className="border-0">State</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">Opening Days</th>
                      <th className="border-0">Opening Time</th>
                      <th className="border-0">Closing Time</th>
                      <th className="border-0">Total Clicks</th>
                      <th className="border-0">Store Created</th>
                      <th className="border-0">Store Updated</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Get Location</th>
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
                        <td>{item.vendor_id}</td>
                        <td>
                          <img
                            src={item.store_image}
                            alt={item.store_name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td title={item.store_name}>
                          {item.store_name.slice(0, 5)}
                        </td>
                        <td title={item.store_desc}>
                          {item.store_desc.slice(0, 8)}
                        </td>
                        <td title={item.store_address}>
                          {item.store_address.slice(0, 10)}
                        </td>
                        <td>{item.pincode}</td>
                        <td>{item.city}</td>
                        <td>{item.state}</td>
                        <td>{item.country}</td>
                        <td style={{display:"flex",flexDirection:"row",justifyContent:"Center",alignItems:"center",textAlign:"center"}}>
                        {
                         item.opening_days.split(",").map((ele,index)=>(
                            <div key={index}  className="day-circle" style={{marginTop:"20px",width:"15px",height:"15px",background:"lightgray",color:"black"}}>
                                    {daysOfWeek[index] || ele}
                             </div>
                         ))
                        }
                          {/* */}
                        </td>
                        <td>{item.opening_time}</td>
                        <td>{item.closing_time}</td>
                        <td>{item.total_clicks}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>

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
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            style={{ color: "gray" }}
                            onClick={() =>
                              getLocation(item.latitude, item.longitude)
                            }
                          >
                            <i className="fa fa-location-arrow"></i>
                          </Button>
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
                              style={{ color: "blue" }}
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
                                setSelectedStore(item);
                                setShowUpdateStore(true);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </Button>

                            {item?.active == "1" && (
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"

                                // disabled={storeBlocked
                                
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
            </Card>
          </Col>
        </Row>
        <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <Paginate/>
        </div>
      </Container>
      <UpdateStore
        showUpdateStore={showUpdateStore}
        setShowUpdateStore={setShowUpdateStore}
        item={selectedStore}
        getStore={getStore}
      />

      <AddStore
        showAddStore={showAddStore}
        setShowAddStore={setShowAddStore}
        getStore={getStore}

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
          <p>Are you sure you want to block this store?</p>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            variant="danger"
            onClick={() => {
              handleBlockStore(blockData);
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
                  {days.map((day,index) => (
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
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default StoreManager;
