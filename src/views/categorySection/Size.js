import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { useEffect, useContext } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const Size = () => {
  const [sizeName, setSizeName] = useState("");
  const [selectSizeAttribute, setSelectSizeAttribute] = useState("");
  const [data, setData] = useState([]);
  const [sizeAttribute, setSizeAttribute] = useState([]);
  const { setCategoriesId } = useContext(Utils);
  const [size, setSize] = useState("");
  const notificationAlertRef = React.useRef(null);

  const handleSubmit = () => {
    const SelectedSizeAttribute = data.filter((ele) => {
      return ele.attr_name == selectSizeAttribute;
    });
    const id = SelectedSizeAttribute[0].id;
    setCategoriesId(id);

    var formdata = new FormData();

    formdata.append("id", `${id}`);
    formdata.append("size", sizeName);

    Http.PostAPI(process.env.REACT_APP_ADDSIZE, formdata, null)
      .then((res) => {
        if (res?.data?.success) {
          setSize(res?.data?.data);
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

    setSizeName("");
    setSelectSizeAttribute("");
  };

  useEffect(() => {
    Http.GetAPI(
      process.env.REACT_APP_GETSIZEATTRIBUTES + "?" + Math.random(),
      data,
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
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
