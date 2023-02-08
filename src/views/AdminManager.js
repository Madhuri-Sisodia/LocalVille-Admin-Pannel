import React from "react";
import { Form, Button, ButtonToolbar } from "rsuite";
import '../assets/css/admin.css';

function Admin() {
  return (
    <>
      <div className="AddAdminMainContainer">
        <div className="AdminContainer">
          <p>ADD ADMIN</p>


          <Form fluid>
            <div className="InnnerContainerAdmin">
              <Form.Group controlId="name-1">
                <Form.ControlLabel style={{ color: "#808080" }}>ADMIN NAME</Form.ControlLabel>
                <Form.Control placeholder="Admin Name" name="name" />

              </Form.Group>
              <Form.Group controlId="email-1">
                <Form.ControlLabel >ADMIN EMAIL</Form.ControlLabel>
                <Form.Control style={{ color: "#e5e5ea" }} placeholder="Admin Email" name="email" type="email" />
              </Form.Group>

              <Form.Group controlId="password-1">
                <Form.ControlLabel>CREATE PASSWORD</Form.ControlLabel>
                <Form.Control name="password" type="password" placeholder="Enter Password" autoComplete="off" />
              </Form.Group>
              <Form.Group controlId="password-1">
                <Form.ControlLabel>RE-ENTER PASSWORD</Form.ControlLabel>
                <Form.Control name="password" type="password" placeholder="Re-enter Password" autoComplete="off" />
              </Form.Group>
            </div>
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" style={{ marginTop: "3rem", marginBottom: "0.5rem" }} block>Submit</Button>

              </ButtonToolbar>
            </Form.Group>
          </Form>

        </div>
      </div>
    </>
  )
}

export default Admin;