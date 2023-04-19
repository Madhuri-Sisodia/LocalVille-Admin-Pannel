import React, { useState, useRef } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar, Avatar, Dropdown } from "rsuite";
import { Http } from "../../config/Service";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import Modal from "rsuite/Modal";
import { event } from "jquery";
import { Uploader, Message, Loader, useToaster } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

// function previewFile(file, callback) {
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     callback(reader.result);
//   };
//   reader.readAsDataURL(file);
// }

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  const [category, setCategory] = useState([]);
  const notificationAlertRef = React.useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const toaster = useToaster();
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);

  const handleSubmit = () => {
    var data = new FormData();
    data.append("section_name", sectionName);
    data.append("section_image", imageUrl);

    Http.PostAPI(process.env.REACT_APP_ADDCATEGORYSECTION, data)
      .then((res) => {
        console.warn("jaldi aajaa ", res);
        if (res?.data?.status) {
          setCategory(res?.data?.data);
          notificationAlertRef.current.notificationAlert(
            SuccessNotify(res?.data?.message)
          );
        } else {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify(res?.data?.message)
          );
          // setSectionName("");
          // setImageUrl("");
        }
      })
      .catch((e) => {
        notificationAlertRef.current.notificationAlert(
          ErrorNotify("Something went wrong")
        );
      });
    setSectionName("");
    setImageUrl("");

    // setSectionName("");
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
              <input
                type="text"
                required
                value={sectionName}
                placeholder="Enter Category Section"
                onChange={(e) => {
                  setSectionName(e.target.value);
                  console.log("ggggggggggg", e.target.value);
                }}
                style={{
                  width: "100%",
                  height: "30px",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "20px",
                }}
              />
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
              {/* <Uploader
                fileListVisible={false}
                listType="picture"
                action="//jsonplaceholder.typicode.com/posts/"
                // action={imageUrl}
                accept=".jpg,.jpeg,.png"
                onChange={(fileList) => {
                  if (fileList.length > 0) {
                    const file = fileList[0];
                    setUploading(true);
                    previewFile(file.blobFile, (value) => {
                      setImageUrl(value);
                      setUploading(false);
                    });
                  } else {
                    setImageUrl(null);
                  }
                }}
                // onChange={(value) => {
                //   const url = URL.createObjectURL(value[0].blobFile);
                //   setImageUrl(url);
                // }}
                // onChange={(value) => {
                //   setImageUrl(value[0]);
                //   previewFile(value[0].blobFile, (preview) => {
                //     setPreviewImage(preview);
                //   });
                // }}
                // onChange={(value) => setImageUrl(value)}
                onUpload={(file) => {
                  setUploading(true);
                  previewFile(file.blobFile, (value) => {
                    setImageUrl(value);
                  });
                }}
                onSuccess={(response, file) => {
                  setUploading(false);
                  toaster.push(
                    <Message type="success">Uploaded successfully</Message>
                  );
                  console.log(response);
                }}
                onError={() => {
                  setImageUrl(null);
                  setUploading(false);
                  toaster.push(<Message type="error">Upload failed</Message>);
                }}
              >
                <button style={{ width: 60, height: 60 }}>
                  {uploading && <Loader backdrop center />}
                  {imageUrl ? (
                    <img src={imageUrl} width="60%" height="60%" />
                  ) : (
                    <button style={{ marginLeft: 15 }}>
                      <CameraRetroIcon />
                    </button>
                    // <AvatarIcon style={{ fontSize: 70 }} />
                  )}
                </button>
              </Uploader> */}

              {/* <Uploader multiple={false} listType="picture" action="">
                <button></button>
              </Uploader> */}
              <input
                type="file"
                name="imageUrl"
                required
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                  console.log("file", e.target.files[0]);
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
