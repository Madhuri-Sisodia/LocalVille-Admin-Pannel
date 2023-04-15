import React, { useState, useContext } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import {
  Form,
  Button,
  ButtonToolbar,
  Avatar,
  Dropdown,
  RadioGroup,
  Radio,
} from "rsuite";
import { Http } from "../../config/Service";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Modal from "rsuite/Modal";
const SubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSizeAttribute, setSelectSizeAttribute] = useState("");
  const [color, setColor] = useState(1);
  const [size, setSize] = useState(1);
  const [sizeData, setSizeData] = useState([]);
  const [sizeAttribute, setSizeAttribute] = useState(1);
  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const { Categoriesid } = useContext(Utils);
  const notificationAlertRef = React.useRef(null);
  const [imageUrl, setImageUrl] = useState("");

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
    const SelectedCategory = data.filter((ele) => {
      return ele.name == selectCategory;
    });

    const selectedAttribute = sizeData.filter((ele) => {
      return ele.attr_name == selectSizeAttribute;
    });

    const id = SelectedCategory[0]?.id ? SelectedCategory[0]?.id : 0;
    const attrId = selectedAttribute[0]?.id ? selectedAttribute[0]?.id : 0;

    var formdata = new FormData();
    formdata.append("category_id", `${id}`);
    formdata.append("subcategory_name", subCategoryName);
    formdata.append("color", color == "Yes" ? 1 : 0);
    formdata.append("size", size == "Yes" ? 1 : 0);
    formdata.append("size_att", attrId);
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
        if (res?.data?.status) {
          setData(res?.data?.data);
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
                            onChange={(event) => {
                              setSelectSizeAttribute(event.target.value);
                            }}
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
            <Form.ControlLabel
              style={{
                color: "#808080",
                fontSize: "0.9rem",
                marginTop: "1em",
                PaddingTop: "20px",
              }}
            >
              Add Image
            </Form.ControlLabel>
            <Form.Group>
              {/* <Avatar
                onClick={handleOpen}
                style={{ marginTop: "0.5rem", width: "3em", height: "3em" }}
              ></Avatar> */}
              <input
                type="file"
                name="imageUrl"
                required
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                }}
              />
            </Form.Group>

            <Form.Group>
              <ButtonToolbar>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
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
