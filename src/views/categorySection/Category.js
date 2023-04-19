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
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = () => {
    const SelectedSection = data.filter((ele) => {
      return ele.section_name == selectSection;
    });
    const id = SelectedSection[0].id;
    setCategoriesId(id);

    var formdata = new FormData();

    formdata.append("section_id", `${id}`);
    formdata.append("category_name", categoryName);

    formdata.append("section_name", sectionName);

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
  };

  useEffect(() => {
    Http.GetAPI(
      process.env.REACT_APP_GETCTEGORYSECTION + "?" + Math.random(),
      data,
      null
    )
      .then((res) => {
        console.log(res?.data?.data);
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

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  }
  // function handleImageUpload() {
  //   const formData = new FormData();
  //   formData.append("image", selectedImage);
  //   fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="MainContainer">
        <div className="Container">
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
              <Form.ControlLabel
                style={{
                  color: "#808080",
                  fontSize: "0.9rem",
                  marginTop: "2em",
                  PaddingTop: "20px",
                }}
              >
                Add Image
              </Form.ControlLabel>
              <Form.Group>
                <div>
                  <label htmlFor="image-upload" style={{ display: "block" }}>
                    <img src={""} alt="Upload Icon" style={{ width: "50px" }} />
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    value={""}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "50%" }}
                    />
                  )}
                  {/* {selectedImage && (
                    <button onClick={handleImageUpload}>Upload Image</button>
                  )} */}
                </div>
                {/* <Uploader marginBottom={"10em"} listType="picture" action="">
                  <button></button>
                </Uploader> */}
              </Form.Group>
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
