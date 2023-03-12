import { useState,useEffect } from "react";
import { Form} from "rsuite";
import ErrorMessage from "customComponents/ErrorMessage";
import "../../assets/css/admin.css";
import MultipleSelect from "components/MultipleSelect";
import { Http } from "config/Service";
import { apis } from "config/WebConstant";
import MyComponent from "components/React-Quil-text-Editor";
import { Data } from "@react-google-maps/api";

const EmailManager = () => {
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [data,setData] = useState([])
    

  const getVendors = () => {
    Http.GetAPI(apis.getVendorsData + "?" + Math.random(), data, null)
      .then((res) => {
        if (res?.data?.status) {

          setData(res?.data?.data);
        } else {
          alert("Fields not matched");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert("Something went wrong.");
        console.log("Error:", e);
      });
  };

  useEffect(() => {
    getVendors();
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <div className="MainContainer">
        <div className="Container">
          <Form
            fluid
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group>
              <Form.ControlLabel>VENDORS</Form.ControlLabel>
              <MultipleSelect 
              data={data}
              setSelectedVendors={setSelectedVendors}
              selectedVendors={selectedVendors}
              />
               
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>TITLE</Form.ControlLabel>
              <Form.Control
                placeholder="Vendor Title"
                name="title"
                value={title}
                onChange={(value) => setTitle(value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>MESSAGE</Form.ControlLabel>
             <MyComponent/>
            </Form.Group>
            <button
              type="submit"
              block
              style={{
                backgroundColor: "blueviolet",
                border: "blueviolet",
                borderRadius: "3px 3px 3px 3px",
                width: "100%",
                padding: "10px",
                color: "white",
                marginTop: "20px",
                fontSize: "0.9rem",
              }}
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmailManager;
