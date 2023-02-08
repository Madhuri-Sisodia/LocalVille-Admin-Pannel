import React from 'react';
import '../assets/css/admin.css';
import { Form, Radio, RadioGroup, } from "rsuite";


function Category() {
    return (
        <div className="AddAdminMainContainer">
            <div className="AdminContainer">
                <Form fluid>
                    <div className="InnnerContainerAdmin">
                        <Form.Group controlId="name-1">
                            <Form.ControlLabel style={{ color: "#808080" }}>CATEGORY NAME</Form.ControlLabel>
                            <Form.Control placeholder="Category Name" name="name" />
                        </Form.Group>
                        <Form.Group controlId="name-1">
                            <Form.ControlLabel style={{ color: "#808080" }}>CATEGORY</Form.ControlLabel>
                            <Form.Control placeholder="Category" name="name" />
                        </Form.Group>
                    </div>
                    <br/>
                    <p>Contain Sizes</p>
                    <div className="InnnerContainerAdmin">
                    <Form.Group controlId="radioList">
                        <RadioGroup name="radioList" inline>
                            <Radio value="A">Item A</Radio>
                            <Radio value="B">Item B</Radio>
                            <Radio value="C">Item C</Radio>
                            <Radio value="D">Item D</Radio>
                        </RadioGroup>
                    </Form.Group>
                    </div>
                    <br/>
                    <p>Contain Colors</p>
                    <div className="InnnerContainerAdmin">
                    <Form.Group controlId="radioList">
                        <RadioGroup name="radioList" inline>
                            <Radio value="A">Item A</Radio>
                            <Radio value="B">Item B</Radio>
                            <Radio value="C">Item C</Radio>
                            <Radio value="D">Item D</Radio>
                        </RadioGroup>
                    </Form.Group>
                    </div>
                    <br/>
                    
                    <div className="InnnerContainerAdmin">
                    <Form.Group controlId="radioList">
                        <RadioGroup name="radioList" inline>
                            <Radio value="A">Item A</Radio>
                            <Radio value="B">Item B</Radio>
                            <Radio value="C">Item C</Radio>
                            <Radio value="D">Item D</Radio>
                        </RadioGroup>
                    </Form.Group>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Category;