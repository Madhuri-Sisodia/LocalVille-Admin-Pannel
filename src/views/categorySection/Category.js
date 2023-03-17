import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect, useContext } from "react";
import { Utils } from "CommonUtils/Utils";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const { setCategoriesId } = useContext(Utils);
  const [status, setStatus] = useState();
  const [notifyMessage, setnotifyMessage] = useState();
  const notificationAlertRef = React.useRef(null);
  

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
    const SelectedSection = data.filter((ele) => {
      console.log(ele.name);
      return ele.section_name == selectSection;
    });
    const id = SelectedSection[0].id;
    setCategoriesId(id);

    var formdata = new FormData();

    formdata.append("section_id", `${id}`);
    formdata.append("category_name", categoryName);
  
    console.log("formdata=>",formdata)
    Http.PostAPI(process.env.REACT_APP_ADDPRODUCTCATEGORY, formdata, null)
      .then((res) => {
        console.log("Data", res);
        setStatus(res?.data?.status);
        setnotifyMessage(res?.data?.message);
        console.warn(res?.data?.message);
        if (res?.data?.status) {
          setCategory(res?.data?.data);
          notify("tr");
          // alert("Category added successfully");
        } else {
          notify("tr");
          // alert("Category already exists");
        }
      })
      .catch((e) => {
        notifySecond("tr");
        // alert("Something went wrong.");
        console.log("Error:", e);
      });

    setCategoryName("");
    setSelectSection("");
  };

  useEffect(() => {
    Http.GetAPI(process.env.REACT_APP_GETCTEGORYSECTION + "?" + Math.random(),data, null)
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
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
                  Category Section
                </Form.ControlLabel>
                <div>
                  <select
                    name="selectSection"
                    value={selectSection}
                    required
                    onChange={(event) => setSelectSection(event.target.value)}
                    style={{
                      height: "30px",
                      borderRadius: "5px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      borderColor: "#808020",
                    }}
                  >
                    <option value="">Select</option>
                    {data.map((category) => (
                      <option key={category.id} value={category.section_name}>
                        {category.section_name}
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
                Category Name
              </Form.ControlLabel>
              <Form.Control
                placeholder="Category Name"
                name="categoryName"
                value={categoryName}
                required="setCategoryName"
                onChange={(value) => setCategoryName(value)}
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

export default Category;
