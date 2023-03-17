import React, { useState, useEffect } from "react";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import NotificationAlert from "react-notification-alert";

import {
  Form,
  Radio,
  RadioGroup,
  Button,
  ButtonToolbar,
  SelectPicker,
  Checkbox,
} from "rsuite";
import { Table, Card, Col } from "react-bootstrap";
import CloseIcon from "@rsuite/icons/Close";

import "../../assets/css/admin.css";
import BlockBanner from "./BlockBanner";
import ButtonComponent from "views/ButtonComponent";

const BannerManager = () => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     image: "https://i.pravatar.cc/50",
  //     redirect: "Yes",
  //     url: "url1",
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     image: "https://i.pravatar.cc/50",
  //     redirect: "Yes",
  //     url: "url2",
  //     status: "block",
  //   },
  //   {
  //     id: 3,
  //     image: "https://i.pravatar.cc/50",
  //     redirect: "No",
  //     url: "url3",
  //     status: "active",
  //   },
  // ];
  const [formData, setFormData] = useState({
    image: "",
    redirect: "",
    url: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [blockData, setBlockData] = useState([]);
  const [addBanner, setAddBanner] = useState([]);
  const [status, setStatus] = useState();
  const [notifymessage, setNotifymessage] = useState();
  const notificationAlertRef = React.useRef(null);

  console.log("aaaa",imageUrl);

  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>{notifymessage}</b>
          </div>
        </div>
      ),
      type: status ? "success" : "danger",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  const notifySecond = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Something went wrong..!!</b>
          </div>
        </div>
      ),
      type: status ? "success" : "danger",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  const getBanner = () => {
    Http.GetAPI(process.env.REACT_APP_GETBANNER + "?" + Math.random(), data)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          setData(res?.data?.data);
          console.log(res.data.data)
        } else {
          // alert("Fields not matched");
          notify("tr");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        notifySecond("tr");
        // alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);
  
  const resetForm = () => {
    setFormData({
      image: "",
      redirect: "",
      url: "",
    });
    setImageUrl("");
  };

  const handleSubmit = () => {
    let redirectImg
    console.log(formData.redirect=="Yes")
    if(formData.redirect=="Yes"){
            redirectImg = "1"
    }
    else{
      redirectImg = "0"
    }

    console.log(redirectImg)
    var data = new FormData();
    data.append("banner_image", imageUrl);
    console.log("BBB",imageUrl)
    data.append("is_redirect", redirectImg);
    data.append("url", formData.url);
    data.append("active", 1);

    Http.PostAPI(process.env.REACT_APP_ADDBANNER, data)
      .then((res) => {
        console.log("resp", res);
        setStatus(res?.data?.status);
        setNotifymessage(res?.data?.message);
        console.warn(res?.data?.message);
        if (res?.data?.status) {
          setAddBanner(res?.data?.data);
          getBanner();
        } else {
          notify("tr");
          // alert("Fields not matched");
        }
      })
      .catch((e) => {
        notifySecond("tr");
        // alert("Something went wrong.");
        console.log("Error:", e);
      });
    resetForm();
  };

  

  const handleFieldChange = (e,name) => {
    setFormData((previous)=>{
      return {...previous,[name]:e}
    });
   
  };
  
  console.log(formData)

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group>
              <Form.ControlLabel htmlFor="file">IMAGE</Form.ControlLabel>
              <input
                type="file"
                name="imageUrl"
                required
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>IMAGE REDIRECTION</Form.ControlLabel>
              <RadioGroup
                name="redirect"
                inline
                onChange={(e) => handleFieldChange(e,'redirect')}
                required
              >
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </RadioGroup>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>URL</Form.ControlLabel>
              <Form.Control
                name="url"
                type="url"
                onChange={(e) => handleFieldChange(e,'url')}
                required
              />
            </Form.Group>

           <ButtonComponent 
          block 
          buttontext="Submit"
           />


            <div style={{ marginTop: "80px" }}>
              <Card
                className="strpied-tabled-with-hover"
                style={{ borderRadius: "10px" }}
              >
                <Card.Header
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Title as="h4">Banner Manager Table</Card.Title>
                </Card.Header>

                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0">Image</th>
                        <th className="border-0">Image Redirection</th>
                        <th className="border-0">Url</th>
                        <th className="border-0">Status</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>
                            <img
                              src={item.image}
                              alt="image"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {console.log(item.is_redirect)}
                            {(item.is_redirect == 1) ? "Yes" : "No"}
                          </td>
                          <td>{item.url}</td>
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
                          <td>
                            {item?.active == "1" && (
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                style={{ cursor: "pointer", color: "red" }}
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
            </div>
          </Form>
        </div>
      </div>

      <BlockBanner
        showModal={showModal}
        setShowModal={setShowModal}
        blockData={blockData}
        getBanner={getBanner}
      />
    </>
  );
};

export default BannerManager;
