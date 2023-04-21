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
  Schema,
} from "rsuite";
import { Http } from "../../config/Service";
import { useEffect } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Modal from "rsuite/Modal";
import { Uploader } from "rsuite";
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
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // setImageFile(file);
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setErrorMessage("image upload success");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000); // set timer for 2 seconds
    } else {
      setImageFile(null);
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setErrorMessage("");
  };

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
    formdata.append("subcat_image", imageFile);
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
    setImageFile("");
    setErrors({});
    setShowNotification("");
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

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    subCategoryName: StringType().isRequired("Admin field is required."),
  });

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
          <Form.ControlLabel
            style={{
              color: "#808080",
              fontSize: "0.9rem",
              marginTop: "1em",
              PaddingTop: "20px",
            }}
          >
            Add Subcategory Image
          </Form.ControlLabel>

          <Form.Group>
            <div>
              {showNotification && errorMessage && (
                <div style={{ color: "green" }}>{errorMessage}</div>
              )}
              {imageFile ? (
                <div>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Avatar"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  />
                  <div style={{ marginTop: "1em" }}>
                    <button onClick={handleRemoveImage}>Remove Image</button>
                  </div>
                </div>
              ) : (
                <div style={{ overflow: "hidden" }}>
                  <label htmlFor="avatar-upload">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Avatar Placeholder"
                      style={{ borderRadius: "50%", width: "70px" }}
                    />
                    {/* <span>Select Image</span> */}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
          </Form.Group>
          <Form
            fluid
            model={model}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
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
                  className={
                    errors.selectCategory
                      ? "form-control is-invalid"
                      : "form-control"
                  }
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
                {errors.selectCategory && (
                  <Message>{errors.selectCategory}</Message>
                )}
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
