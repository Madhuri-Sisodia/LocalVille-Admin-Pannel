import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";

const SubCategory = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectCategory, setSelectCategory] = useState("");
    const [color, setColor] = useState(1);
    const [size, setSize] = useState(1);
    const [sizeAttribute, setSizeAttribute] = useState(1);
    const [data, setData] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
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
              <b>Sub Categories Successfully Added..!!</b>
            </div>
          </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
      };
  
      notificationAlertRef.current.notificationAlert(options);
    };
  
    const handleSubmit = () => {
      console.log("subCategoryName", subCategoryName);
  
      var data = new FormData();
      data.append("category_id",selectCategory);
      data.append("name", subCategoryName);
      data.append("color",color);
      data.append("size",size);
      data.append("size_att",sizeAttribute);
  
      console.log("subCategory", data);
      Http.PostAPI(apis.addProdSubCategory + "?" + Math.random(), data, null)
        .then((res) => {
          console.log("Data", res);
          if (res?.data?.status) {
            setSubCategory(res?.data?.data);
            alert("Sub-category added successfully");
          } else {
            alert("Sub-category already exists");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
        });
      setSubCategoryName("");
      setSelectCategory("");
    };
  
    useEffect(() => {
      Http.GetAPI(apis.getProductCategory + "?" + Math.random(), data, null)
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
            <Form fluid>
              <Form.Group controlId="name-1">
              <div className="InnnerContainerCategory">
                <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                  Category
                </Form.ControlLabel>
                <select
                  name="selectCategory"
                  value={selectCategory}
                  onChange={(event) => setSelectCategory(event.target.value)}
                >
                  <option value="">Select</option>
                  {data.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
                <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                  Sub-Category Name
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Sub-Category Name"
                  name="subCategoryName"
                  value={subCategoryName}
                  required="setSubCategoryName"
                  onChange={(value) => setSubCategoryName(value)}
                />
              </Form.Group>
              {/* <Form.Group controlId="name-1"> */}
              <Form.Group>
                <ButtonToolbar>
                  <Button
                    appearance="primary"
                    type="submit"
                    style={{ marginTop: "3rem", marginBottom: "0.5rem" }}
                    block onClick={handleSubmit}
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

export default SubCategory;
