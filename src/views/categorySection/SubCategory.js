import React, { useState,useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";


const SubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [color, setColor] = useState(1);
  const [size, setSize] = useState(1);
  const [sizeAttribute, setSizeAttribute] = useState(1);
  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const {Categoriesid} = useContext(Utils)
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

  // const handleSubmit = () => {
  //     // console.log("hello")
  //   const id = data.filter((ele)=>{
  //       return(ele.name==selectCategory)
  //   })
    const handleSubmit = () => {
       console.log(selectCategory)
       console.log(data)
      const SelectedCategory = data.filter((ele)=>{
        return(ele.name==selectCategory)
      })
          
      console.log(SelectedCategory)
      const id = SelectedCategory[0].id
          console.log(id)
    

    var formdata = new FormData();
    formdata.append("category_id", `${id}`);
    formdata.append("subcategory_name", subCategoryName);
    formdata.append("color", color);
    formdata.append("size", size);
    formdata.append("size_att", sizeAttribute);
    Http.PostAPI(process.env.REACT_APP_ADDPRODSUBCATEGORY + "?" + Math.random(), formdata, null)
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
    Http.GetAPI(process.env.REACT_APP_GETPRODUCTCATEGORY + "?" + `category_id=${Categoriesid}`, data, null)
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
            <Form.Group controlId="name-1" style={{marginBottom:"20px"}}>
              <div className="InnnerContainerCategory" style={{marginTop:"20px",marginBottom:"20px",flexDirection:"column"}}>
                <Form.ControlLabel style={{ color: "#808080", fontSize: "0.9rem",marginBottom:"10px",PaddingTop:"20px" }}>
                  Category
                </Form.ControlLabel>
                <select
                  name="selectCategory"
                  value={selectCategory}
                  onChange={(event) => setSelectCategory(event.target.value)}
                  style={{height:"30px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderColor: "#808020"}}
                >
                  <option value="">Select</option>
                  {data.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem",marginTop:"20px" }}>
                Sub-Category Name
              </Form.ControlLabel>
              <Form.Control
                placeholder="Sub-Category Name"
                name="subCategoryName"
                value={subCategoryName}
                required="setSubCategoryName"
                onChange={(value) => setSubCategoryName(value)}
              />
              <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"50%",paddingLeft:"10px"}}>
                <h4 style={{fontSize:"1rem"}}>Color</h4>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="flexRadioDefault1" onChnage={()=>setColor(1)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" onChnage={()=>setColor(0)} />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    No
                  </label>
                </div>
                </div>
                <div style={{paddingLeft:"10px"}}>
                <h4 style={{width:"50%",fontSize:"1rem"}}>Size</h4>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="flexRadioDefault1" onChnage={()=>setSize(1)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" onChnage={()=>setSize(0)}/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    No
                  </label>
                </div>
              </div>
              </div>
              <div style={{paddingLeft:"10px"}}>
              <h4 style={{fontSize:"1rem"}}>Size att</h4>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="flexRadioDefault1" onChnage={()=>setSizeAttribute(1)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" onChnage={()=>setSizeAttribute(0)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
              </div>
            </Form.Group>
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