import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import "../../assets/css/day.css";

import "../../assets/css/modal.css";

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
  const [selectedDays, setSelectedDays] = useState([]);

  console.log(selectedDays);

  const toggleDaySelection = (day) => {
    console.log("sss", selectedDays);
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      console.log("sss", selectedDays);
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const [days, setDays] = useState([]);
  const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

  useEffect(() => {
    if (item?.opening_days) {
      let parsedDays;
      if (Array.isArray(item?.opening_days)) {
        parsedDays = item?.opening_days;
      } else if (typeof item?.opening_days === "string") {
        try {
          parsedDays = JSON.parse(item?.opening_days);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          parsedDays = [];
        }
      }
      setDays(parsedDays);
      console.log("ppp", parsedDays);
    }
  }, [item]);

  const getInput = (e) => {
    setStoreData((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  const handleUpdateStore = () => {
    var data = new FormData();

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

    Http.PostAPI(apis.updateStore, data, null)
      .then((res) => {
        console.log("data", res);
        if (res?.data?.status) {
          setStore(res?.data?.data);
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

  return (
    <>
      {item != null && (
        <Modal show={showUpdateStore} onHide={() => setShowUpdateStore(false)}>
          <Modal.Header>
            <Modal.Title className="update-title">Update Stores</Modal.Title>
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
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">State</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.state}
                  type="text"
                  name="state"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <label className="update-label">Country</label>
                <Form.Control
                  className="update-form"
                  defaultValue={item?.country}
                  type="text"
                  name="country"
                  onChange={(e) => {
                    getInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="update-label">Opening Days</Form.Label>
                <div className="update-form">
                  {days.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <div
                        className={`week-days ${isSelected ? "selected" : ""}`}
                        name="selectedDays"
                        onClick={() => toggleDaySelection(day)}
                      >
                        {daysOfWeek[day - 1] || day}
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

              <button
                type="submit"
                block
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateStore();
                  setShowUpdateStore(false);
                }}
                style={{
                  backgroundColor: "blueviolet",
                  border: "blueviolet",
                  borderRadius: "3px 3px 3px 3px",
                  width: "100%",
                  padding: "5px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                Update
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateStore;
