import React, { useState, useEffect, useContext } from "react";
import { MdClose } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import GoogleAutocomplete from "components/googleAutoComplete";
import GooglePlacesPicker from "components/googlePlacesPicker";
import { Utils } from "CommonUtils/Utils";
import { TextField, validationAddModel } from "components/Validation";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

import axios from "axios";
import { Form } from "rsuite";

import ButtonComponent from "views/ButtonComponent";
import ReactSelect from "CommonUtils/React-Select";
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const AddStore = ({ showAddStore, setShowAddStore, getStore, addStore }) => {
  const [store, setStore] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const [vendortData, setVendorData] = useState([]);
  const [btnLoading, setBtnloading] = useState(false);
  const { location } = useContext(Utils);
  const [Data, setData] = useState([]);
  const [storeData, setStoreData] = useState({
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
  const notificationAlertRef = React.useRef(null);
  const formRef = React.useRef();
  const fileInputRef = React.useRef(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setErrorMessage(null);
  };
  const toggleDaySelection = (index) => {
    const selectedDay = index + 1;
    if (selectedDays.includes(selectedDay)) {
      setSelectedDays(selectedDays.filter((d) => d !== selectedDay));
    } else {
      setSelectedDays([...selectedDays, selectedDay]);
    }
    setMessage("");
  };
  const selectedDaysFormatted = JSON.stringify(selectedDays);



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
        } catch (error) {}
      };
      getCity();
    }
  }, [storeData.pincode]);

  const validateOpeningClosingTime = () => {
    const openingTime = new Date(`2000-01-01T${storeData.openingTime}:00Z`);
    const closingTime = new Date(`2000-01-01T${storeData.closingTime}:00Z`);
    const timeDiffInMinutes = (closingTime - openingTime) / (1000 * 60);
    if (timeDiffInMinutes <= 60 && timeDiffInMinutes >= 0) {
      setTimeError(
        "The difference between Opening Time and Closing Time should be at least 1 hour"
      );
    } else {
      setTimeError("");
    }
  };

  const handleSubmit = () => {
    // event.preventDefault();
    validateOpeningClosingTime();
    if (selectedDays.length === 0) {
      setMessage("Opening Day is required");
    } else {
      setMessage("");
    }

    if (!imageFile) {
      setErrorMessage("Image is required");
      return;
    }

    if (!formRef.current.check()) {
      return;
    } else {
      const id = selectSection?.value;

      var data = new FormData();
      data.append("vendor_id", id);
      data.append("store_image", imageFile);
      data.append("lat", location.lat);
      data.append("long", location.lng);
      data.append("store_name", storeData.storeName);
      data.append("store_desc", storeData.storeDesc);
      data.append("lat", location.lat);
      data.append("long", location.lng);
      data.append("address", storeData.address);
      data.append("pincode", storeData.pincode);
      data.append("city", storeData.city);
      data.append("state", storeData.state);
      data.append("country", storeData.country);
      data.append("opening_days", selectedDaysFormatted);
      data.append("opening_time", storeData.openingTime);
      data.append("closing_time", storeData.closingTime);
      setBtnloading(true);

      Http.PostAPI(process.env.REACT_APP_ADDSTORE, data, null)
        .then((res) => {
          setBtnloading(false);
          if (res?.data?.status) {
            setStore(res?.data?.data);
            getStore();
            notificationAlertRef.current.notificationAlert(
              SuccessNotify(res?.data?.message)
            );
            setShowAddStore(false);
            setSelectedDays("");
            setMessage("");
            setImageFile("");
            setError("");
            setErrorMessage("");
            setTimeError("");
            resetForm();
          } else {
            notificationAlertRef.current.notificationAlert(
              ErrorNotify(res?.data?.message)
            );
          }
        })
        .catch((e) => {
          setBtnloading(false);
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });

      setShowAddStore(false);
    }
  };

  const daysOfWeek = ["M", "T", "W", "Th", "F", "St", "S"];

  useEffect(() => {
    const getVendorsData = () => {
      Http.GetAPI(
        process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(),
        null
      )
        .then((res) => {
          if (res?.data?.status) {
            setVendorData(res?.data?.dropdown_data);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });
    };
    getVendorsData();
  }, []);

  useEffect(() => {
    if (vendortData) {
      const Result = vendortData.map((ele, index) => {
        return {
          label: `${index + 1})  ${ele.name} , ${ele.email}`,
          value: ele.email,
        };
      });
      setData(Result);
    }
  }, [vendortData]);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Modal show={showAddStore} onHide={() => setShowAddStore(false)}>
        <Modal.Header>
          <Modal.Title className="title">Add Stores</Modal.Title>
          <MdClose
            className="close-icon"
            onClick={() => {
              setShowAddStore(false);
              setSelectedDays("");
              setMessage("");
              setErrorMessage("");
              setImageFile("");
              setError("");
              setTimeError("");
              resetForm();
            }}
          />
        </Modal.Header>
        <Modal.Body className="add-body">
          <Form
            fluid
            ref={formRef}
            model={validationAddModel}
            formValue={storeData}
            onSubmit={handleSubmit}
            onChange={setStoreData}
          >
            <Form.Group>
              <Form.ControlLabel style={{ color: "#808080" }}>
                Store Address
              </Form.ControlLabel>
              <div style={{ marginBottom: "20px" }}>
                <GoogleAutocomplete />
              </div>
              <div>
                <GooglePlacesPicker />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel style={{ color: "#808080" }}>
                Vendor Name
              </Form.ControlLabel>
              <div style={{ width: "100%", marginTop: "5px" }}>
                <ReactSelect
                  data={vendortData}
                  setSelectSection={setSelectSection}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel htmlFor="file">Store Image</Form.ControlLabel>
              <div>
                {imageFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Avatar"
                      style={{
                        width: "50px",
                        height: "60px",
                        borderRadius: "11px",
                      }}
                    />

                    {/* <div style={{ marginTop: "1em" }}>
                      <button onClick={handleRemoveImage}>Remove Image</button>
                    </div> */}
                  </div>
                ) : (
                  <div style={{ overflow: "hidden" }}>
                    <label htmlFor="avatar-upload">
                      <div
                        style={{
                          color: "blueviolet",
                          width: "55px",
                          height: "55px",
                          border: "1px dotted",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CameraRetroIcon style={{ fontSize: "35px" }} />
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </Form.Group>

            {/* <Form.Group>
              <Form.ControlLabel>Store Image</Form.ControlLabel>

              <input
                type="file"
                name="image"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                ref={fileInputRef}
              />
              {error && (
                <div style={{ color: "red", fontSize: "0.7rem" }}>{error}</div>
              )}
            </Form.Group> */}

            <TextField name="storeName" label="Store Name" type="text" />

            <TextField name="storeDesc" label="Store Description" />

            <TextField name="address" label="Store Address" />

            <TextField name="pincode" label="Store Pincode" type="text" />
            <TextField name="city" label="City" disabled />
            <TextField name="state" label="State" disabled />
            <TextField name="country" label="Country" disabled />

            <Form.Group>
              <Form.ControlLabel style={{ color: "#808080" }}>
                Opening Days
              </Form.ControlLabel>

              {daysOfWeek.map((day, index) => {
                const isSelected = selectedDays.includes(index + 1);
                return (
                  <div
                    key={day}
                    className={`week-days ${isSelected ? "selected" : ""}`}
                    name="selectedDays"
                    onClick={() => toggleDaySelection(index)}
                  >
                    {day}
                  </div>
                );
              })}
            </Form.Group>
            {message && (
              <div style={{ color: "red", fontSize: "0.7rem" }}>{message}</div>
            )}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                name="openingTime"
                label="Opening Time"
                type="time"
                onchange={validateOpeningClosingTime}
                style={{ marginRight: "24px" }}
              />
              <TextField
                name="closingTime"
                label="Closing Time"
                type="time"
                onchange={validateOpeningClosingTime}
                style={{ marginLeft: "24px" }}
              />
            </div>
            {timeError && (
              <div style={{ color: "red", fontSize: "0.7rem" }}>
                {timeError}
              </div>
            )}

            <ButtonComponent buttontext="Add" btnLoading={btnLoading} />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddStore;
