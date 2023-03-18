import React, { useState,useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";
import {SuccessNotify} from "components/NotificationShowPopUp";
import {ErrorNotify} from "components/NotificationShowPopUp";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const {setCategoriesId} = useContext(Utils)
//   const [selectCategory, setSelectCategory] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

console.log(sectionName)
  const notificationAlertRef = React.useRef(null);

  
  const handleSubmit = () => {

        var formdata = new FormData();
        formdata.append("section_name",sectionName );

        Http.PostAPI(process.env.REACT_APP_ADDCATEGORYSECTION, formdata, null)
        .then((res) => {
          console.log("Data", res);
          if (res?.data?.status) {
            setCategory(res?.data?.data);
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
        setSectionName("");
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
                Add Category Section
              </Form.ControlLabel>
              <input type="text" placeholder="Enter Category Section" onChange={(e)=>{ setSectionName(e.target.value)}} style={{width:"100%",height:"30px",borderRadius:"5px",padding:"10px",marginTop:"20px"}}/>
               {/* <select
                name="selectSection"
                value={selectSection}
                onChange={(event) => setSelectSection(event.target.value)}
              >
                <option value="">Select</option>
                {data.map((category) => (
                  <option key={category.id} value={category.section_name}>
                    {category.section_name}
                  </option>
                ))}
              </select> */}
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
