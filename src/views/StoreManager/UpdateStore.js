import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/day.css";
import GoogleAutocomplete from "components/googleAutoComplete";
import GooglePlacesPicker from "components/googlePlacesPicker";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";

const UpdateStore = ({
  showUpdateStore,
  setShowUpdateStore,
  item,
  getStore,
}) => {
  const [storeData, setStoreData] = useState({
    storeId: "",
    storeName: "",
    storeDesc: "",
    address: "",
    latitude: "",
    longitude: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    openingDays: "",
    openingTime: "",
    closingTime: "",
  });
  const [store, setStore] = useState([]);
  const [hideData, setHideData] = useState(true);
  const [UpdateStoreImage, SetUpdateStoreImage] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const notificationAlertRef = React.useRef(null);

  console.log(selectedDays);

  const toggleDaySelection = (index) => {
    if (selectedDays.includes(index + 1)) {
      setSelectedDays(selectedDays.filter((d) => d !== index + 1));
      console.log("sss", selectedDays);
    } else {
      setSelectedDays([...selectedDays, index + 1]);
    }
  };

  const [days, setDays] = useState([]);
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  useEffect(() => {
    if (item?.opening_days) {
      let parsedDays;
      if (Array.isArray(item.opening_days)) {
        parsedDays = item.opening_days;
        parsedDays = JSON.parse(item.opening_days);
        console.log(parsedDays);
      } else {
        try {
          parsedDays = item.opening_days.split(",");
        } catch (error) {
          console.error("Error parsing JSON:", error);
          parsedDays = [];
        }
      }
      setDays(parsedDays);
    }
  }, [item]);

  const getInput = (e) => {
    setStoreData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  const handleUpdateStore = () => {
    var data = new FormData();

    data.append("store_image", UpdateStoreImage);
    data.append("store_id", storeData.storeId ? storeData.storeId : item.id);
    data.append(
      "store_name",
      storeData.storeName ? storeData.storeName : item.store_name
    );
    data.append(
      "store_desc",
      storeData.storeDesc ? storeData.storeDesc : item.store_desc
    );
    data.append("lat", storeData.latitude ? storeData.latitude : item.latitude);
    data.append(
      "long",
      storeData.longitude ? storeData.longitude : item.longitude
    );
    data.append(
      "address",
      storeData.address ? storeData.address : item.store_address
    );
    data.append(
      "pincode",
      storeData.pincode ? storeData.pincode : item.pincode
    );
    data.append("city", storeData.city ? storeData.city : item.city);
    data.append("state", storeData.state ? storeData.state : item.state);
    data.append(
      "country",
      storeData.country ? storeData.country : item.country
    );
    data.append(
      "opening_days",
      selectedDays ? selectedDays : item.opening_days
    );
    data.append(
      "opening_time",
      storeData.openingTime ? storeData.openingTime : item.opening_time
    );
    data.append(
      "closing_time",
      storeData.closingTime ? storeData.closingTime : item.closing_time
    );
    console.log("updateStore", data);

    Http.PostAPI(process.env.REACT_APP_UPDATESTORE, data, null)
      .then((res) => {
        console.log("data", res);
        if (res?.data?.status) {
          setStore(res?.data?.data);
          getStore();
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
        } else {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify(res?.data?.message)
          );
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  };

  useEffect(() => {
    if (storeData.pincode) {
      const getCity = async () => {
        try {
          const Result = await axios.get(
            "https://api.postalpincode.in/pincode/" + storeData.pincode
          );
          const data = Result?.data[0]?.PostOffice;
          console.log(data);
          if (data.length >= 1) {
            setStoreData((previous) => {
              return { ...previous, city: data[0]?.District };
            });
            setStoreData((previous) => {
              return { ...previous, country: data[0]?.Country };
            });
            setStoreData((previous) => {
              return { ...previous, state: data[0]?.State };
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      getCity();
    }
  }, [storeData.pincode]);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {item != null && (
        <Modal show={showUpdateStore} onHide={() => setShowUpdateStore(false)}>
          <Modal.Header>
            <Modal.Title className="update-title">
              Update Stores data
            </Modal.Title>
            <MdClose
              className="update-close-icon"
              onClick={() => {
                setShowUpdateStore(false);
                setSelectedDays("");
              }}
            />
          </Modal.Header>
          <Modal.Body className="update-body">
            <Form>
              {!hideData && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <label className="update-label">Store ID</label>
                  <Form.Control
                    className="update-form"
                    defaultValue={item?.id}
                    name="storeId"
                    onChange={(e) => {
                      getInput(e);
                    }}
                    type="id"
                  ></Form.Control>
                </Form.Group>
              )}

              {!hideData && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <label className="update-label">Longitude</label>
                  <Form.Control
                    className="update-form"
                    defaultValue={item?.longitude}
                    name="storeId"
                    onChange={(e) => {
                      getInput(e);
                    }}
                    type="number"
                  ></Form.Control>
                </Form.Group>
              )}

              {!hideData && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <label className="update-label">Latitude</label>
                  <Form.Control
                    className="update-form"
                    defaultValue={item?.latitude}
                    name="storeId"
                    onChange={(e) => {
                      getInput(e);
                    }}
                    type="number"
                  ></Form.Control>
                </Form.Group>
              )}

              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Store File</label>
                <Form.Control
                  className="update-form"
                  name="storeName"
                  onChange={(e) => {
                    SetUpdateStoreImage(e.target.files[0]);
                  }}
                  type="file"
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Store Address</Form.Label>
                <div style={{ marginBottom: "20px" }}>
                  <GoogleAutocomplete />
                </div>
                <div>
                  <GooglePlacesPicker />
                </div>
              </Form.Group>
              <Form.Group style={{ marginBottom: "1rem" }}>
                <label className="update-label">Store Name</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.store_name}
                  name="storeName"
                  onChange={(e) => {
                    getInput(e);
                  }}
                  type="text"
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Store Description</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.store_desc}
                  type="text"
                  name="storeDesc"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Address</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.store_address}
                  type="text"
                  name="address"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Pincode</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.pincode}
                  type="number"
                  name="pincode"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">City</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.city}
                  type="text"
                  name="city"
                  disabled
                  value={storeData.city ? storeData.city : item.city}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">State</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.state}
                  type="text"
                  name="state"
                  disabled
                  value={storeData.state ? storeData.state : item.state}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Country</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.country}
                  type="text"
                  name="country"
                  disabled
                  value={storeData.country ? storeData.country : item.country}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="update-label">Opening Days</Form.Label>
                <div className="update-form">
                  {daysOfWeek.map((day, index) => {
                    const isSelected = selectedDays.includes(index + 1)
                      ? selectedDays.includes(index + 1)
                      : days.includes(index + 1);
                    return (
                      <div
                        className={`week-days ${isSelected ? "selected" : ""}`}
                        name="selectedDays"
                        onClick={() => toggleDaySelection(index)}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group>
                <label className="update-label">Opening Time</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.opening_time}
                  type="text"
                  name="openingTime"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Closing Time</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.closing_time}
                  type="text"
                  name="closingTime"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <ButtonComponent
                buttontext="Update"
                block
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateStore();
                  setShowUpdateStore(false);
                }}
              />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateStore;
