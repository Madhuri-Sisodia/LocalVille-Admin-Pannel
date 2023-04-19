import React from "react";

import { Form, Button, ButtonToolbar, Schema, Panel, FlexboxGrid } from 'rsuite';

const { StringType} = Schema.Types;

const validationModel = Schema.Model({
  aName: StringType().isRequired("Admin Name is required."),

  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Admin Email is required."),
  password: StringType().isRequired("Password is required."),
  rePassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, "Password do not match")
    .isRequired("This field is required."),
    // image: StringType()
    // // .accept("image/png", "image/jpeg", "image/gif")
    // // .maxSize(5 * 1024 * 1024, "File size is too large.")
    // .isRequired("Please upload an image."),
});


const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

 export  {validationModel,TextField} ;
