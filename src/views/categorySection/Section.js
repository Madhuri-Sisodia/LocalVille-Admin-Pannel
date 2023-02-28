import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
//   const [selectCategory, setSelectCategory] = useState("");
  const [data, setData] = useState([]);
//   const [category, setCategory] = useState([]);
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
            <b>Section Successfully Added..!!</b>
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
    console.log("sectionName", sectionName);

    var data = new FormData();
    data.append("name", sectionName);

    console.log("section", data);
    Http.PostAPI(apis.addCategory, data, null)
      .then((res) => {
        console.log("Data", res);
        if (res?.data?.status) {
          setSection(res?.data?.data);
          alert("Section added successfully");
        } else {
          alert("Section already exists");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
        console.log("Error:", e);
      });
    setSectionName("");
    // setSelectCategory("");
  };

//   useEffect(() => {
//     Http.GetAPI(apis.getCategory + "?" + Math.random(), data, null)
//       .then((res) => {
//         if (res?.data?.status) {
//           setData(res?.data?.data);
//         } else {
//           alert("Fields not matched");
//         }
//       })
//       .catch((e) => {
//         alert("Something went wrong.");
//         console.log("Error:", e);
//       });
//   }, []);

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
                Category Section Name
              </Form.ControlLabel>
              <Form.Control
                placeholder="Category Section Name"
                name="sectionName"
                value={sectionName}
                required="setSectionName"
                onChange={(value) => setSectionName(value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="name-1"> */}
            {/* <div className="InnnerContainerCategory">
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                Category Section Name
              </Form.ControlLabel>
              <select
                name="selectCategory"
                value={selectCategory}
                onChange={(event) => setSelectCategory(event.target.value)}
              >
                <option value="">Select</option>
                {data.map((category) => (
                  <option key={category.id} value={category.section_name}>
                    {category.section_name}
                  </option>
                ))}
              </select>
            </div> */}

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

export default Section;
