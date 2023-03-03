import React, { useState,useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";

const Color = () => {
  const [colorName, setcolorName] = useState("");
  const [colorCode, setColorCode] =useState("");
  const [selectColor, setColor] = useState("");
  const [selectColorCode, setSelectColorCode] = useState("");

//   const {setSizeAttributeId} = useContext(Utils)
//   const [selectCategory, setSelectCategory] = useState("");
  const [data, setData] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [category, setCategory] = useState([]);
  // const [getCategoryData, setGetCategoryData] = useState([]);
console.log(colorName)
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
            <b>Color Successfully Added..!!</b>
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


        const SelectedColor = data.filter((ele)=>{
          return(ele.color==selectColor)
        })  

        // setCategoriesId(SelectedSection[0].id)
      
        var formdata = new FormData();
        formdata.append("color",colorName);
        formdata.append("code",colorCode);

        Http.PostAPI(apis.addColor, formdata, null)
        .then((res) => {
          console.log("Data", res);
          if (res?.data?.status) {
            setColor(res?.data?.data);
            alert("Color added successfully");
          } else {
            alert("Color already exists");
          }
        })
        .catch((e) => {
          alert("Something went wrong.");
          console.log("Error:", e);
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
              <input placeholder="Enter color" type="text" onChange={(e)=>{ setColor(e.target.value)}} style={{width:"100%",height:"30px",borderRadius:"5px",padding:"10px",marginTop:"20px"}}/>
               <br/>
                <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                Select Color
                </Form.ControlLabel>
              <input placeholder="Enter color code" type="color" onChange={(e)=>{ setColorCode(e.target.value)}} style={{width:"100px",height:"100px",borderRadius:"5px",padding:"10px",marginTop:"20px"}}/>
               <div style={{marginTop:"20px"}}>
               {colorCode}
               </div>
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

export default Color;
