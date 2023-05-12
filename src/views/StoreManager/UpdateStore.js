import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { Form } from "rsuite";
import { Http } from "../../config/Service";
import "../../assets/css/day.css";
import { FaCamera } from "react-icons/fa";
import GoogleAutocomplete from "components/googleAutoComplete";
import GooglePlacesPicker from "components/googlePlacesPicker";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { validationUpdateStoreModel } from "components/Validation";

import "../../assets/css/modal.css";
import ButtonComponent from "views/ButtonComponent";

const UpdateStore = ({
  showUpdateStore,
  setShowUpdateStore,
  item,
  getStore,
}) => {
  const [storeData, setStoreData] = useState({
    storeId: item?.id,
    storeName: item?.store_name,
    storeDesc: item?.store_desc,
    address: item?.store_address,
    latitude: item?.latitude,
    longitude: item?.longitude,
    pincode: item?.pincode,
    city: item?.city,
    state: item?.state,
    country: item?.country,
    openingDays: item?.opening_days,
    openingTime: item?.opening_time,
    closingTime: item?.closing_time,
  });
  const [store, setStore] = useState([]);
  const [hideData, setHideData] = useState(true);
  const [UpdateStoreImage, SetUpdateStoreImage] = useState("");
  const [baseImage, setBaseImage] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeError, setTimeError] = useState("");
  const notificationAlertRef = React.useRef(null);
  const formRef = React.useRef();

  const toggleDaySelection = (index) => {
    if (selectedDays.includes(index + 1)) {
      setSelectedDays(selectedDays.filter((d) => d !== index + 1));
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
      } else {
        try {
          parsedDays = item.opening_days.split(",");
        } catch (error) {
          parsedDays = [];
        }
      }
      setDays(parsedDays);
    }
  }, [item]);
  const resetForm = () => {
    setStoreData({
      storeImage: "",
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
      selectedDays: "",
    });
    
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    SetUpdateStoreImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBaseImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const validateOpeningClosingTime = () => {
    if (!item?.opening_time || !item?.closing_time ) {
      setTimeError("Opening and Closing Time is required");
      return;
    }
    // if (!storeData.openingTime || !storeData.closingTime) {
    //   setTimeError("Opening and Closing Time is required");
    //   return;
    // }
    const openingTime = new Date(`2000-01-01T${ item?.opening_time }:00Z`);
    const storeOpeningTime = new Date(`2000-01-01T${storeData.openingTime}:00Z`);
    const storeClosingTime = new Date(`2000-01-01T${storeData.closingTime}:00Z`);
    const closingTime = new Date(`2000-01-01T${ item?.closing_time}:00Z`);
    const timeDiffInMinutes = (closingTime - openingTime) / (1000 * 60);
    if (timeDiffInMinutes <= 60 && timeDiffInMinutes >= 0) {
      console.log("heloooo")
      setTimeError(
        "The difference between Opening Time and Closing Time should be at least 1 hour"
      );
      return;
    } else {
      setTimeError("");
    }
    const storetimeDiffInMinutes = (storeOpeningTime - storeClosingTime) / (1000 * 60);
    if (storetimeDiffInMinutes <= 60 && storetimeDiffInMinutes >= 0) {
      console.log("heloooo")
      setTimeError(
        "The difference between Opening Time and Closing Time should be at least 1 hour"
      );
      return;
    } else {
      setTimeError("");
    }
  };

  const handleUpdateStore = () => {
    // e.preventDefault();
    
    validateOpeningClosingTime();
    if (selectedDays.length === 0) {
      setMessage("Opening Day is required");
      return;
    } else {
      setMessage("");
    }
   

    if (!formRef.current.check()) {
      console.log("Form Error!");

      return;
    } else {
      var data = new FormData();

      data.append("store_image", UpdateStoreImage);
      data.append("store_id", storeData.storeId ? storeData.storeId : item?.id);
      data.append(
        "store_name",
        storeData.storeName ? storeData.storeName : item?.store_name
      );
      data.append(
        "store_desc",
        storeData.storeDesc ? storeData.storeDesc : item?.store_desc
      );
      data.append(
        "lat",
        storeData.latitude ? storeData.latitude : item?.latitude
      );
      data.append(
        "long",
        storeData.longitude ? storeData.longitude : item?.longitude
      );
      data.append(
        "address",
        storeData.address ? storeData.address : item?.store_address
      );
      data.append(
        "pincode",
        storeData.pincode ? storeData.pincode : item?.pincode
      );
      data.append("city", storeData.city ? storeData.city : item?.city);
      data.append("state", storeData.state ? storeData.state : item?.state);
      data.append(
        "country",
        storeData.country ? storeData.country : item?.country
      );
      data.append(
        "opening_days",
        selectedDays ? selectedDays : item?.opening_days
      );
      data.append(
        "opening_time",
        storeData.openingTime ? storeData.openingTime : item?.opening_time
      );
      data.append(
        "closing_time",
        storeData.closingTime ? storeData.closingTime : item?.closing_time
      );

      Http.PostAPI(process.env.REACT_APP_UPDATESTORE, data, null)
        .then((res) => {
          if (res?.data?.status) {
            setStore(res?.data?.data);
            setSelectedDays("");
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
        resetForm();
      setShowUpdateStore(false);
     
    }
  };

  useEffect(() => {
    if (storeData.pincode) {
      const getCity = async () => {
        try {
          const Result = await axios.get(
            "https://api.postalpincode.in/pincode/" + storeData.pincode
          );
          const data = Result?.data[0]?.PostOffice;
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
              Update Store data
            </Modal.Title>
            <MdClose
              className="update-close-icon"
              onClick={() => {
                setShowUpdateStore(false);
                setSelectedDays("");
                setTimeError("");
                setMessage("");
                resetForm();
              }}
            />
          </Modal.Header>
          <Modal.Body className="update-body">
            <Form
              fluid
              ref={formRef}
              model={validationUpdateStoreModel}
              formValue={storeData?.defaultValue}
              onSubmit={handleUpdateStore}
              onChange={setStoreData}
            >
              {!hideData && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <Form.ControlLabel className="update-label">
                    Store ID
                  </Form.ControlLabel>
                  <Form.Control
                    className="update-form"
                    defaultValue={
                      storeData.storeId ? storeData.storeId : item?.id
                    }
                    name="storeId"
                    type="id"
                  ></Form.Control>
                </Form.Group>
              )}

              {!hideData && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <Form.ControlLabel className="update-label">
                    Longitude
                  </Form.ControlLabel>
                  <Form.Control
                    className="update-form"
                    defaultValue={
                      storeData.longitude
                        ? storeData.longitude
                        : item?.longitude
                    }
                    name="longitude"
                    type="number"
                  ></Form.Control>
                </Form.Group>
              )}

              {!hideData && (
                <Form.Group style={{ marginTop: "0rem", marginBottom: "1rem" }}>
                  <Form.ControlLabel className="update-label">
                    Latitude
                  </Form.ControlLabel>
                  <Form.Control
                    className="update-form"
                    defaultValue={
                      storeData.latitude ? storeData.latitude : item?.latitude
                    }
                    name="latitude"
                    type="number"
                  ></Form.Control>
                </Form.Group>
              )}

              <Form.Group style={{ marginBottom: "1rem" }}>
                <div>Store Image</div>
                <img
                  src={UpdateStoreImage ? baseImage : item?.store_image}
                  alt="Image"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
                <div style={{ display: "flex", alignItems: "left" }}>
                  <label htmlFor="UpdateStoreImage">
                    <div style={{ position: "relative" }}>
                      <FaCamera
                        style={{
                          fontSize: "15px",
                          cursor: "pointer",
                          color: "blueviolet",
                        }}
                      />
                      <input
                        id="UpdateStoreImage"
                        type="file"
                        name="UpdateStoreImage"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>
                  </label>
                  <span
                    style={{
                      margin: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Upload Image
                  </span>
                </div>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel className="add-label">
                  Store Address
                </Form.ControlLabel>
                <div style={{ marginBottom: "20px" }}>
                  <GoogleAutocomplete />
                </div>
                <div>
                  <GooglePlacesPicker />
                </div>
              </Form.Group>
              <Form.Group style={{ marginBottom: "1rem" }}>
                <Form.ControlLabel className="update-label">
                  Store Name
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  name="storeName"
                  defaultValue={
                    storeData.storeName ? storeData.storeName : item?.store_name
                  }
                  type="text"
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel className="update-label">
                  Store Description
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="storeDesc"
                  defaultValue={
                    storeData.storeDesc ? storeData.storeDesc : item?.store_desc
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel className="update-label">
                  Address
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="address"
                  defaultValue={
                    storeData.address ? storeData.address : item?.store_address
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel className="update-label">
                  Pincode
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  type="number"
                  name="pincode"
                  defaultValue={
                    storeData.pincode ? storeData.pincode : item?.pincode
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel className="update-label">
                  City
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="city"
                  disabled
                  defaultValue={storeData.city ? storeData.city : item.city}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel className="update-label">
                  State
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="state"
                  disabled
                  defaultValue={storeData.state ? storeData.state : item.state}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel className="update-label">
                  Country
                </Form.ControlLabel>
                <Form.Control
                  className="update-form"
                  type="text"
                  name="country"
                  disabled
                  defaultValue={
                    storeData.country ? storeData.country : item.country
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel className="update-label">
                  Opening Days
                </Form.ControlLabel>
                <div className="update-form">
                  {daysOfWeek.map((day, index) => {
                    const isSelected = selectedDays.includes(index + 1)
                      ? selectedDays.includes(index + 1)
                      : days.includes(index + 1);
                    return (
                      <div
                        key={index}
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
              {message && (
              <div style={{ color: "red", fontSize: "0.7rem" }}>{message}</div>
            )}


              <div style={{ display: "flex", flexDirection: "row" }}>
                <Form.Group>
                  <Form.ControlLabel className="update-label">
                    Opening Time
                  </Form.ControlLabel>
                  <Form.Control
                    className="update-form"
                    defaultValue={
                      storeData.openingTime
                        ? storeData.openingTime
                        : item?.opening_time
                    }
                    type="time"
                    name="openingTime"
                    onChange={validateOpeningClosingTime}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.ControlLabel className="update-label">
                    Closing Time
                  </Form.ControlLabel>
                  <Form.Control
                    className="update-form"
                    defaultValue={
                      storeData.closingTime
                        ? storeData.closingTime
                        : item?.closing_time
                    }
                    type="time"
                    name="closingTime"
                    onChange={validateOpeningClosingTime}
                  ></Form.Control>
                </Form.Group>
              </div>
              {timeError && (
                <div style={{ color: "red", fontSize: "0.7rem" }}>{timeError}</div>
              )}

              <ButtonComponent buttontext="Update" block />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default UpdateStore;
