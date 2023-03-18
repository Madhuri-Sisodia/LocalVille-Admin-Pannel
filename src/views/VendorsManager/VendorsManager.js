import React, { useState, useEffect,useContext } from "react";
import { Input, Whisper, Tooltip, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import UpdateVendor from "./UpdateVendor";
import { Utils } from "CommonUtils/Utils";
import Paginte from "components/Paginate";
import AddVendor from "./AddVendor";

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
import BlockVendor from "./BlockVendor";

const VendorsManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages,setTotalPages] = useState(1)
  const [blockData, setBlockData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [currentModalIdx, setCurrentModalIdx] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const {pageNo,setDisabledNext,pageView} = useContext(Utils)

  const [isLoading, setIsLoading] = useState(true);

  const Debounce = (fun)=>{
    let timer;
    return (...arg)=>{
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fun.call(this,arg)
        },500)
    }
}

  const getVendors = () => {
    Http.GetAPI(process.env.REACT_APP_GETVENDORSDATA + "?" + `page=${pageView}`, data, null)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          if(res.data.data.length>0){
            setData(res?.data?.data);
            setDisabledNext(true)
            setTotalPages(res.data.total_pages)
          }
          else{
            setDisabledNext(false)
          }
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
    getVendors();
  }, [pageView]);


   const filtervendor = (e)=>{
    console.log(e)
    Http.GetAPI(apis.searchvendor + "?" +`search=${e} & page=${pageNo}`, data, null)
    .then((res) => {
      setIsLoading(false);
      if (res?.data?.status) {
        if(res.data.data.length>0){
          setData(res?.data?.data);
          setDisabledNext(true)
        }
        else{
          setDisabledNext(false)
        }
      } else {
        alert("Fields not matched");
      }
    })
    .catch((e) => {
      setIsLoading(false);
      alert("Something went wrong.");
      console.log("Error:", e);
    });
   }

  const search =  Debounce(filtervendor)
    
  return (
    <>
      <Container fluid>
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
                setShowAddVendor(true);
              }}
            >
              Add Vendors
            </button>

                <Card.Title as="h4">Vendors Manager</Card.Title>

                <p className="card-category">Vendors details and action</p>
                <br></br>
                <InputGroup style={{ width: "250px" }}>
                  <Input placeholder="Search" onChange={(e)=>{search(e)}} />
                  <InputGroup.Button>
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
                <br></br>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Vendor Image</th>
                      <th className="border-0">Vendor Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Login Count</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr style={{ fontSize: "0.95rem" }} key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.user_image}
                            alt="image"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <div
                            style={{
                              backgroundColor:
                                item.active == "1" ? "green" : "red",
                              border: "none",
                              fontSize: "0.75rem",
                              color: "white",
                              padding: "3px 10px",
                              borderRadius: "17px",
                              display: "inline-block",
                            }}
                          >
                            {item.active == "1" ? "active" : "block"}
                          </div>
                        </td>
                        <td>{item.login_count}</td>
                        <td>
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="primary"
                            onClick={() => {
                              setSelectedVendor(item);
                              setShowUpdateModal(true);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>

                          {item?.active == "1" && (
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={() => {
                                setShowModal(true);
                                setBlockData(item.id);
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <Paginte pages={totalPages}/>
        </div>
          </Col>
        </Row>

        <UpdateVendor
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          item={selectedVendor}
          getVendors={getVendors}
        />
        <AddVendor
          showAddVendor={showAddVendor}
          setShowAddVendor={setShowAddVendor}
          getVendors={getVendors}
        />
        <BlockVendor
          showModal={showModal}
          setShowModal={setShowModal}
          blockData={blockData}
          getVendors={getVendors}
        />
      </Container>
    </>
  );
};

export default VendorsManager;
