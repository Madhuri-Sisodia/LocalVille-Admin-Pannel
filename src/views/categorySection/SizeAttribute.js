import React, { useState, useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const SizeAttribute = () => {
  const [sizeAttributeName, setSizeAttributeName] = useState("");
  const [selectSizeAttribute, setSizeAttribute] = useState("");
  const { setCategoriesId } = useContext(Utils);
  const [btnLoading, setBtnloading] =useState (false);
  const [data, setData] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const handleSubmit = () => {
    const SelectedSizeAttribute = data.filter((ele) => {
      return ele.sizeAttribute_name == selectSizeAttribute;
    });

    // setCategoriesId(SelectedSection[0].id)

    var formdata = new FormData();
    formdata.append("sizeAttribute_name", sizeAttributeName);

    Http.PostAPI(process.env.REACT_APP_ADDSIZEATTRIBUTE, formdata, null)
      .then((res) => {
        if (res?.data?.status) {
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
    setSizeAttributeName("");
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
                Add Size Attribute
              </Form.ControlLabel>
              <input
                type="text"
                value={sizeAttributeName}
                onChange={(e) => {
                  setSizeAttributeName(e.target.value);
                }}
                style={{
                  width: "100%",
                  height: "30px",
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

export default SizeAttribute;
