import React, { useState, useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import {
  Form,
  Button,
  ButtonToolbar,
  Dropdown,
  RadioGroup,
  Radio,
} from "rsuite";
import { Http } from "../../config/Service";
import { apis } from "../../config/WebConstant";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const SubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  // const [selectSizeAttribute,setSelectSizeAttribute]=useState("");
  const [color, setColor] = useState(1);
  const [size, setSize] = useState(1);
  const [sizeData, setSizeData] = useState([]);
  const [sizeAttribute, setSizeAttribute] = useState(1);
  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const { Categoriesid } = useContext(Utils);
  const notificationAlertRef = React.useRef(null);
  const [status, setStatus] = useState();
  const [selectSection, setSelectSection] = useState("");
  const [notifyMessage, setnotifyMessage] = useState();
  const [selectSizeAttribute, setSelectSizeAttribute] = useState("");

  useEffect(() => {
    Http.GetAPI(
      process.env.REACT_APP_GETSIZEATTRIBUTES + "?" + Math.random(),
      data,
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          setSizeData(res?.data?.data);
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
  }, []);

  const handleSubmit = () => {
    console.log(selectCategory);
    console.log(data);
    const SelectedCategory = data.filter((ele) => {
      return ele.name == selectCategory;
    });

    console.log(SelectedCategory);
    const id = SelectedCategory[0].id;
    console.log(id);

    console.log(color, size, sizeAttribute);
    var formdata = new FormData();
    formdata.append("category_id", `${id}`);
    formdata.append("subcategory_name", subCategoryName);
    formdata.append("color", color == "Yes" ? 1 : 0);
    formdata.append("size", size == "Yes" ? 1 : 0);
    formdata.append("size_att", sizeAttribute == "Yes" ? 1 : 0);
    Http.PostAPI(
      process.env.REACT_APP_ADDPRODSUBCATEGORY + "?" + Math.random(),
      formdata,
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          setSubCategory(res?.data?.data);
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

    setSubCategoryName("");
    setSelectCategory("");
  };

  useEffect(() => {
    Http.GetAPI(
      process.env.REACT_APP_GETPRODUCTCATEGORY +
        "?" +
        `category_id=${Categoriesid}`,
      data,
      null
    )
      .then((res) => {
        setStatus(res?.data?.status);
        setnotifyMessage(res?.data?.message);
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          notify("tr");
          // alert("Fields not matched");
        }
      })
      .catch((e) => {
        notifySecond("tr");
        console.log("Error:", e);
      });
  }, []);

  useEffect(() => {
    Http.GetAPI(process.env.REACT_APP_GETSIZEATTRIBUTES + "?" + Math.random(),data, null)
      .then((res) => {
        console.log(res);
        setStatus(res?.data?.status);
        setnotifyMessage(res?.data?.message);
        console.warn(res?.data?.message);
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          notify("tr");
          alert("Fields not matched");
        }
      })
      // .catch((e) => {
      //   notifySecond("tr");
      //   // alert("Something went wrong.");
      //   console.log("Error:", e);
      //   }
      // })
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
          <Form fluid>
            <Form.Group controlId="name-1" style={{ marginBottom: "20px" }}>
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
                    marginBottom: "10px",
                    PaddingTop: "20px",
                    width: "100%",
                  }}
                >
                  Category
                </Form.ControlLabel>
                <select
                  name="selectCategory"
                 
                  value={selectCategory}
                  onChange={(event) => setSelectCategory(event.target.value)}
                  style={{
                    height: "35px",
                    borderRadius: "5px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderColor: "gray",
                    width: "100%",
                  }}
                >
                  <option value="">Select</option>
                  {data.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <Form.ControlLabel
                style={{
                  color: "#808080",
                  fontSize: "1rem",
                  marginTop: "20px",
                }}
              >
                Sub-Category Name
              </Form.ControlLabel>
              <Form.Control
                placeholder="Sub-Category Name"
                name="subCategoryName"
                value={subCategoryName}
                required="setSubCategoryName"
                onChange={(value) => setSubCategoryName(value)}
              />
              <div>
                <div>
                  <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
                    <Form.Group>
                      <Form.ControlLabel>Set Color</Form.ControlLabel>
                      <RadioGroup
                        name="redirect"
                        inline
                        onChange={(e) => setColor(e)}
                        required
                      >
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                      </RadioGroup>
                    </Form.Group>
                  </div>
                  <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
                    <Form.Group>
                      <Form.ControlLabel>Set Size</Form.ControlLabel>
                      <RadioGroup
                        name="redirect"
                        inline
                        onChange={(e) => setSize(e)}
                        required
                      >
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                      </RadioGroup>
                    </Form.Group>
                  </div>
                  <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
                    <Form.Group>
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
                            {sizeData.map((sizeAttribute) => (
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
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{ marginTop: "3rem", marginBottom: "0.5rem" }}
                  block
                  onClick={handleSubmit}
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
