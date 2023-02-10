import React from 'react';
import { Table, Card, Col } from "react-bootstrap";
import ReloadIcon from '@rsuite/icons/Reload';
import CloseIcon from '@rsuite/icons/Close';
import { Form, Radio, RadioGroup, Button, ButtonToolbar, Dropdown } from "rsuite";
import '../assets/css/admin.css';


function SubCategory() {
    return (
        <div className="MainContainer">
            <Form fluid>
                <div className="Container">
                    <div className="InnerContainer2">
                    <div className="InnnerContainerCategory">
                        <Form.ControlLabel style={{ color: "#6c757d", fontSize: "1rem", marginRight: "1rem" }}>
                            <h5>Select Category</h5>
                        </Form.ControlLabel>
                        <Dropdown title="Select">
                            <Dropdown.Item>New File</Dropdown.Item>
                            <Dropdown.Item>New File with Current Profile</Dropdown.Item>
                            <Dropdown.Item>Download As...</Dropdown.Item>
                            <Dropdown.Item>Export PDF</Dropdown.Item>
                            <Dropdown.Item>Export HTML</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>About</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>
                        Sub-Category Name
                    </Form.ControlLabel>
                    <Form.Control placeholder="Category Name" name="name" />
                    </div>
                    <br />
                    <div className="InnnerContainerRadio">
                    <Col lg="4" sm="6">
                        <div className="InnnerContainer1">
                            < Form.ControlLabel style={{ color: "#6c757d", fontSize: "1rem" }}>Contain Sizes</Form.ControlLabel>
                            <div className="InnnerContainer">
                                <Form.Group controlId="radioList">
                                    <RadioGroup name="radioList">
                                        <Radio value="1">Yes</Radio>
                                        <Radio value="0">No</Radio>
                                    </RadioGroup>
                                </Form.Group>
                            </div>
                           
                        </div>
                        </Col>
                        <br />
                        <Col lg="4" sm="6">
                        <div className="InnnerContainer1">
                            <Form.ControlLabel style={{ color: "#808080", fontSize: "1rem" }}>Contain Colors</Form.ControlLabel>
                            <div className="InnnerContainer">
                                <Form.Group controlId="radioList">
                                    <RadioGroup name="radioList">
                                        <Radio value="1">Yes</Radio>
                                        <Radio value="0">No</Radio>
                                    </RadioGroup>
                                </Form.Group>
                            </div>
                            
                        </div>
                        </Col>
                    </div>
                </div>


                <div className="Container">

                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">

                            <Card.Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Card.Title as="h4">Sub-Categoty Table</Card.Title>
                                <ReloadIcon
                                    style={{ textAlign: "right", width: "3rem", height: "3rem", border: "2px solid #59afff", color: "#59afff", borderRadius: "5px", padding: "10px", margin: "10px" }}
                                />
                            </Card.Header>

                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Category Name</th>
                                            <th className="border-0">Category Type</th>
                                            <th className="border-0">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Dakota Rice</td>
                                            <td>$36,738</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Minerva Hooper</td>
                                            <td>$23,789</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Sage Rodriguez</td>
                                            <td>$56,142</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Philip Chaney</td>
                                            <td>$38,735</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Doris Greene</td>
                                            <td>$63,542</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Mason Porter</td>
                                            <td>$78,615</td>
                                            <td><CloseIcon className="closeButton" /></td>

                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" type="submit" style={{ marginTop: "3rem", marginBottom: "0.5rem" }} block>Submit</Button>

                    </ButtonToolbar>
                </Form.Group>
                </div>
               
            </Form>
        </div>
    )
}

export default SubCategory;