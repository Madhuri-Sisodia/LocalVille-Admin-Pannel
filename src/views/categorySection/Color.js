import React, { useState, useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const Color = () => {
  const [colorName, setcolorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [selectColor, setColor] = useState("");
  const [selectColorCode, setSelectColorCode] = useState("");
  const [btnLoading, setBtnloading] =useState (false);
  const [data, setData] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const handleSubmit = () => {
    const SelectedColor = data.filter((ele) => {
      return ele.color == selectColor;
    });

    var formdata = new FormData();
    formdata.append("color", colorName);
    formdata.append("code", colorCode);

    Http.PostAPI(process.env.REACT_APP_ADDCOLOR, formdata, null)
      .then((res) => {
      
        if (res?.data?.status) {
          setColor(res?.data?.data);
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
    setColor("");
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.Group controlId="name-1">
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                Add Color
              </Form.ControlLabel>
              <input
                placeholder="Enter color"
                type="text"
                onChange={(e) => {
                  setcolorName(e.target.value);
                }}
                style={{
                  width: "100%",
                  height: "30px",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "20px",
                }}
              />
              <br />
              <Form.ControlLabel
                style={{
                  color: "#808080",
                  fontSize: "1rem",
                  marginTop: "20px",
                }}
              >
                Select Color
              </Form.ControlLabel>
              <input
                placeholder="Enter color code"
                type="color"
                onChange={(e) => {
                  setColorCode(e.target.value);
                }}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "20px",
                }}
              />
              
            </Form.Group>


            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{ marginTop: "3rem", marginBottom: "0.5rem" }}
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

export default Color;
