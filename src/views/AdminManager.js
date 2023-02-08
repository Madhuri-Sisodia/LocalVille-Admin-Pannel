import React, { useState } from "react";
import { Form, Button, ButtonToolbar } from "rsuite";
import "../assets/css/admin.css";

const AdminManager = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!name) {
      tempErrors.name = "Name is required";
    }
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }
    if (!rePassword) {
      tempErrors.rePassword = "Re-entered password is required";
    } else if (password !== rePassword) {
      tempErrors.rePassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    
    if (validate()) {
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
      console.log("repassword", rePassword);
      setName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setErrors({});
    }
  
  };

  return (
    <>
      <div className="AddAdminMainContainer">
        <div className="AdminContainer">
          <p>ADD ADMIN</p>

          <Form
            fluid
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="InnnerContainerAdmin">
              <Form.Group>
                <Form.ControlLabel style={{ color: "#808080" }}>
                  ADMIN NAME
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Admin Name"
                  name="adminName"
                  value={name}
                  required="name"
                  onChange={(value) => setName(value)}
                />
                 {errors.name && (
                  <p className="error">{errors.name}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>ADMIN EMAIL</Form.ControlLabel>
                <Form.Control
                  
                  placeholder="Admin Email"
                  name="email"
                  type="email"
                  required="email"
                  value={email}
                  onChange={(value) => setEmail(value)}
                />
                {errors.email && (
                  <p className="error">{errors.email}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>CREATE PASSWORD</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  required="password"
                  autoComplete="off"
                  value={password}
                  onChange={(value) => setPassword(value)}
                />
                 {errors.password && (
                  <p className="error">{errors.password}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>RE-ENTER PASSWORD</Form.ControlLabel>
                <Form.Control
                  name="rePassword"
                  type="password"
                  placeholder="Re-enter Password"
                  required="rePassword"
                  autoComplete="off"
                  value={rePassword}
                  onChange={(value) => setRePassword(value)}
                />
                 {errors.rePassword && (
                  <p className="error">{errors.rePassword}</p>
                )}
              </Form.Group>
            </div>
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
}

export default AdminManager;
