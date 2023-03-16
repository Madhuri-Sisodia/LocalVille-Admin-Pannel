import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect, useContext } from "react";
import { Utils } from "CommonUtils/Utils";

const Size = () => {
  const [sizeName, setSizeName] = useState("");
  const [selectSizeAttribute, setSelectSizeAttribute] = useState("");
  const [data, setData] = useState([]);
  const [sizeAttribute, setSizeAttribute] = useState([]);
  const { setCategoriesId } = useContext(Utils);
  const [size, setSize] = useState("");
  const [status, setStatus] = useState();
  const [notifyMessage, setnotifyMessage] = useState();
  const notificationAlertRef = React.useRef(null);
  console.log(data);
  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>{notifyMessage}</b>
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
            <b>Something went wrong.</b>
          </div>
        </div>
      ),
      type: status ? "success" : "danger",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  const handleSubmit = () => {
    const SelectedSizeAttribute = data.filter((ele) => {
      console.log(ele.name);
      return ele.attr_name == selectSizeAttribute;
    });
    const id = SelectedSizeAttribute[0].id;
    setCategoriesId(id);

    var formdata = new FormData();

    formdata.append("id", `${id}`);
    formdata.append("size", sizeName);

    console.log("formdata=>", formdata);
    Http.PostAPI(apis.addSize, formdata, null)
      .then((res) => {
        console.log("Data", res);
        if (res?.data?.success) {
          setSize(res?.data?.data);
          notify("tr");
          // alert("Size added successfully");
        } else {
          notify("tr");
          // alert("Size already exists");
        }
      })
      .catch((e) => {
        notifySecond("tr");
        // alert("Something went wrong.");
        console.log("Error:", e);
      });

    setSizeName("");
    setSelectSizeAttribute("");
  };

  useEffect(() => {
    Http.GetAPI(process.env.REACT_APP_GETSIZEATTRIBUTES + "?" + Math.random(),data, null)
      .then((res) => {
        console.log(res);
        setStatus(res?.data?.status);
        setnotifyMessage(res?.data?.message);
        console.warn(res?.data?.message);
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          notify("tr");
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        notifySecond("tr");
        // alert("Something went wrong.");
        console.log("Error:", e);
      });
  }, []);


  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group controlId="name-1">
              <div
                className="InnnerContainerCategory"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  flexDirection: "column",
                }}
              >
                <Form.ControlLabel
                  style={{
                    color: "#808080",
                    fontSize: "0.9rem",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Size Attribute
                </Form.ControlLabel>
                <div>
                  <select
                    name="selectSizeAttribute"
                    value={selectSizeAttribute}
                    onChange={(event) =>
                      setSelectSizeAttribute(event.target.value)
                    }
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      borderColor: "#808020",
                    }}
                  >
                    <option value="">Select</option>
                    {data.map((sizeAttribute) => (
                      <option
                        key={sizeAttribute.id}
                        value={sizeAttribute.attr_name}
                      >
                        {sizeAttribute.attr_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Form.ControlLabel
                style={{
                  color: "#808080",
                  fontSize: "0.9rem",
                  marginBottom: "10px",
                  PaddingTop: "20px",
                }}
              >
                Size
              </Form.ControlLabel>
              <Form.Control
                placeholder="Enter size"
                name="sizeName"
                value={sizeName}
                required="setSizeName"
                onChange={(value) => setSizeName(value)}
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                  block
                >
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Size;
