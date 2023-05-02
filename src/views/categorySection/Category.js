import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Placeholder, Avatar } from "rsuite";
import { Http } from "../../config/Service";
import { useEffect, useContext } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { Uploader } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
// import img from "./car.jpg";
const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const { setCategoriesId } = useContext(Utils);
  const notificationAlertRef = React.useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showNotification, setShowNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isImageValid, setIsImageValid] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setIsImageValid(
      file && file.type.startsWith("image/png", "image/jpg", "image/jpeg")
    ); // Update image validity
    if (isImageValid) {
      // setErrorMessage("");
      setTimeout(() => {}, 2000);
    } else {
      setShowNotification("Image Upload Successfull");
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setErrorMessage("Image Removed");
    setTimeout(() => {
      setErrorMessage(false);
      // setShowNotification(false);
    }, 2000);
    setIsImageValid(false); // Update image validity
  };

  const handleSubmit = () => {
    if (isImageValid) {
      const SelectedSection = data.filter((ele) => {
        return ele.section_name == selectSection;
      });
      const id = SelectedSection[0].id;
      setCategoriesId(id);

      var formdata = new FormData();

      formdata.append("section_id", `${id}`);
      formdata.append("category_name", categoryName);
      formdata.append("category_image", imageFile);

      Http.PostAPI(process.env.REACT_APP_ADDPRODUCTCATEGORY, formdata, null)
        .then((res) => {
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

      setCategoryName("");
      setSelectSection("");
      setImageFile("");
    } else {
      setErrorMessage("Please select an image.");
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);
    }
  };

  useEffect(() => {
    Http.GetAPI(
      process.env.REACT_APP_GETCTEGORYSECTION + "?" + Math.random(),
      data,
      null
    )
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
        }
      })
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
          <Form.ControlLabel
            style={{
              color: "#808080",
              fontSize: "0.9rem",
              marginTop: "2em",
              PaddingTop: "20px",
            }}
          >
            Add Category Image
          </Form.ControlLabel>
          <Form.Group>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            {showNotification && (
              <div style={{ color: "green" }}>{showNotification}</div>
            )}
            <div>
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
