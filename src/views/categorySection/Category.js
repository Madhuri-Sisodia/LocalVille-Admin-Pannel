import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [data, setData] = useState([]);
  // const [getCategoryData, setGetCategoryData] = useState([]);

  const notificationAlertRef = React.useRef(null);

  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Categories Successfully Added..!!</b>
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };

    notificationAlertRef.current.notificationAlert(options);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    Http.GetAPI(apis.getCategory + "?" + Math.random(), data, null)
      .then((res) => {
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
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                Category name
              </Form.ControlLabel>
              <Form.Control
                placeholder="Category Name"
                name="categoryName"
                value={categoryName}
                required="setCategoryName"
                onChange={(value) => setCategoryName(value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="name-1"> */}
            <div className="InnnerContainerCategory">
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                Category
              </Form.ControlLabel>
              <Dropdown
                title="Select"
                name="selectCategory"
                value={selectCategory}
                onChange={(value) => setSelectCategory(value)}
              >
                {data.map((category) => (
                  <Dropdown.Item key={category.id}>
                    {category.section_name}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>

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

export default Category;
