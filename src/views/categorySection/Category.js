import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";
import "../../assets/css/admin.css";
import { Form, Button, ButtonToolbar } from "rsuite";
import { Http } from "../../config/Service";
import { useEffect, useContext } from "react";
import { Utils } from "CommonUtils/Utils";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const { setCategoriesId } = useContext(Utils);

  const notificationAlertRef = React.useRef(null);

  const handleSubmit = () => {
    const SelectedSection = data.filter((ele) => {
      return ele.section_name == selectSection;
    });
    const id = SelectedSection[0].id;
    setCategoriesId(id);

    var formdata = new FormData();

    formdata.append("section_id", `${id}`);
    formdata.append("category_name", categoryName);

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
