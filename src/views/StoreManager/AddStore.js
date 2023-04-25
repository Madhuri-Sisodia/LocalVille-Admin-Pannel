import React, { useState, useEffect, useContext } from "react";
import { MdClose } from "react-icons/md";
import { Modal, Form, Button } from "react-bootstrap";
import { Http } from "../../config/Service";
import "../../assets/css/modal.css";
import GoogleAutocomplete from "components/googleAutoComplete";
import GooglePlacesPicker from "components/googlePlacesPicker";
import { Utils } from "CommonUtils/Utils";
// import 'react-select-search/style.css'
import axios from "axios";
import { SelectPicker } from "rsuite";
import { visitIterationBody } from "typescript";
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
  const [storeImage, setStoreImage] = useState([]);
  const { location } = useContext(Utils);
  const [Data, setData] = useState([]);
  const [pincode, setPincode] = useState("");

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

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDaySelection = (index) => {
    if (selectedDays.includes(index + 1)) {
      setSelectedDays(selectedDays.filter((d) => d !== index + 1));
    } else {
      setSelectedDays([...selectedDays, index + 1]);
    }
  };

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
    setImage(null);
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

  const validateOpeningClosingTime = () => {
    const openingTime = new Date(`2000-01-01T${storeData.openingTime}:00Z`);
    const closingTime = new Date(`2000-01-01T${storeData.closingTime}:00Z`);
    const timeDiffInMinutes = (closingTime - openingTime) / (1000 * 60);
    if (timeDiffInMinutes <= 60) {
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

    const vendorid = vendortData.filter((ele) => {
      return ele.email === selectSection?.value;
    });

    const id = vendorid[0].id;
    var data = new FormData();
    data.append("vendor_id", id);
    data.append("store_image", storeImage);
    data.append("lat", location.lat);
    data.append("long", location.lng);
    data.append("store_name", storeData.storeName);
    data.append("store_desc", storeData.storeDesc);
    data.append("lat", location.lat);
    data.append("long", location.lng);
    data.append("address", storeData.address);
    data.append("pincode", storeData?.pincode);
    data.append("city", storeData?.city);
    data.append("state", storeData?.state);
    data.append("country", storeData?.country);
    data.append("opening_days", selectedDays);
    data.append("opening_time", storeData.openingTime);
    data.append("closing_time", storeData.closingTime);

    Http.PostAPI(process.env.REACT_APP_ADDSTORE, data, null).then((res) => {
      if (res?.data?.status) {
        setStore(res?.data?.data);
        getStore();
        return;
      } else {
        const id = selectSection?.value;
        console.log("id", selectSection);
        var data = new FormData();
        data.append("vendor_id", id);
        data.append("store_image", image);
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
        data.append("opening_days", selectedDays);
        data.append("opening_time", storeData.openingTime);
        data.append("closing_time", storeData.closingTime);

        Http.PostAPI(process.env.REACT_APP_ADDSTORE, data, null)
          .then((res) => {
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
              SuccessNotify(res?.data?.message)
            );
          });
        resetForm();

        setShowAddStore(false);
      }
      setStoreData((previous) => {
        return { ...previous, [e.target.name]: e.target.value };
      });
    });

    const daysOfWeek = ["M", "T", "W", "Th", "F", "St", "S"];

    useEffect(() => {
      const getVendorsData = () => {
        Http.GetAPI(
          process.env.REACT_APP_GETVENDORSDATA + "?" + Math.random(),
          { page: 3 },
          null
        )
          .then((res) => {
            if (res?.data?.status) {
              setVendorData(res.data.data);
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
            label: `${index + 1})  ${ele.name} , ${ele.id}`,
            value: ele.id,
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
                setError("");
                setTimeError("");
                resetForm();
              }}
            />
          </Modal.Header>
          <Modal.Body className="add-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Group>
                  <Form.Label className="add-label">Store Address</Form.Label>
                  <div style={{ marginBottom: "20px" }}>
                    <GoogleAutocomplete />
                  </div>
                  <div>
                    <GooglePlacesPicker />
                  </div>
                </Form.Group>

                <Form.Label className="add-label">Vendor Name</Form.Label>
                <div style={{ width: "100%", marginTop: "5px" }}>
                  <ReactSelect
                    data={vendortData}
                    setSelectSection={setSelectSection}
                  />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Store Image</Form.Label>
                <Form.Control
                  type="file"
                  name="storeDesc"
                  required
                  onChange={(e) => {
                    setStoreImage(e.target.files[0]);
                  }}
                ></Form.Control>
              </Form.Group>

              <TextField name="storeName" label="Store Name" type="text" />

              <TextField name="storeDesc" label="Store Description" />

              <TextField name="address" label="Store Address" />

              <TextField name="pincode" label="Store Pincode" type="text" />
              <TextField name="city" label="City" disabled />
              <TextField name="state" label="State" disabled />
              <TextField name="country" label="Country" disabled />

              <Form.Group>
                <Form.Label className="add-label">Store Description</Form.Label>
                <Form.Control
                  type="text"
                  name="storeDesc"
                  required
                  onChange={(e) => {
                    handleInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  required
                  onChange={(e) => {
                    handleInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  value={pincode}
                  required
                  maxLength={6}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={storeData.city}
                  disabled
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={storeData.state}
                  disabled
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={storeData.country}
                  disabled
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="add-label">Opening Days</Form.Label>
                <br />
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

              <ButtonComponent buttontext="Add" />
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };
};
export default AddStore;
