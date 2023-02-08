import React from 'react';
import '../assets/css/admin.css';
import { Form, Radio, RadioGroup, Button, ButtonToolbar } from "rsuite";


function Category() {
    return (
        <div className="AddAdminMainContainer">
            <div className="AdminContainer">
                <Form fluid>
                    {/* <div className="InnnerContainerAdmin"> */}
                        <Form.Group controlId="name-1">
                            <Form.ControlLabel style={{ color: "#808080" , fontSize:"1rem"}}>Category name</Form.ControlLabel>
                            <Form.Control placeholder="Category Name" name="name" />
                        </Form.Group>
                        <Form.Group controlId="name-1">
                            <Form.ControlLabel style={{ color: "#808080", fontSize:"1rem" }}>Category</Form.ControlLabel>
                            <Form.Control placeholder="Category" name="name" />
                        </Form.Group>
                    {/* </div> */}
                    {/* <br /> */}
                    <Form.ControlLabel style={{ color: "#808080", fontSize:"1rem"}}>Contain Sizes</Form.ControlLabel>

                    <div className="InnnerContainer">
                        <Form.Group controlId="radioList">
                            <RadioGroup name="radioList">
                                <Radio value="0">No</Radio>
                                <Radio value="1">Yes</Radio>

                            </RadioGroup>
                        </Form.Group>
                    </div>
                    <br />
                    <Form.ControlLabel style={{ color: "#808080", fontSize:"1rem"}}>Contain Colors</Form.ControlLabel>
                    <div className="InnnerContainer">
                        <Form.Group controlId="radioList">
                            <RadioGroup name="radioList">
                                <Radio value="0">No</Radio>
                                <Radio value="1">Yes</Radio>

                            </RadioGroup>
                        </Form.Group>
                    </div>
                    <br />
                    <Form.ControlLabel style={{ color: "#808080", fontSize:"1rem"}}>sub-Categories</Form.ControlLabel>
                    <div className="InnnerContainer">

                        <Form.Group controlId="radioList">
                            <RadioGroup name="radioList">
                                <Radio value="0">No</Radio>
                                <Radio value="1">Yes</Radio>

                            </RadioGroup>
                        </Form.Group>

                    </div>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary" type="submit" style={{ marginTop: "3rem", marginBottom: "0.5rem" }} block>Submit</Button>

                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Category;