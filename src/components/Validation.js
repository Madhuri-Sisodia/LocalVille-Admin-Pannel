import React from "react";

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Panel,
  FlexboxGrid,
} from "rsuite";

const { StringType } = Schema.Types;
const validationModel = Schema.Model({
  aName: StringType()
    .isRequired("Admin Name is required.")
    .addRule((value) => {
      const regex = /^[a-zA-Z ]+$/;
      return regex.test(value);
    }, "Please enter a valid name using only alphabets and space."),

  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Admin Email is required."),
  password: StringType().isRequired("Password is required."),
  rePassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }

      return true;
    }, "Password do not match")
    .isRequired("This field is required."),
});

const validationUpdateModel = Schema.Model({
  vendorName: StringType().addRule((value) => {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(value);
  }, "Please enter a valid name using only alphabets and space."),
  vendorPhone: StringType().addRule((value) => {
    const regex = /^\d{10}$/;
    return regex.test(value);
  }, "Please enter a valid 10 digit phone number."),
});

const validationAddModel = Schema.Model({
  storeName: StringType()
    .isRequired("Store Name is required")
    .addRule((value) => {
      const regex = /^[a-zA-Z ]+$/;
      return regex.test(value);
    }, "Please enter a valid name using only alphabets and space."),
  storeDesc: StringType().isRequired("Store Description is required"),
  address: StringType().isRequired("Store Address is required"),
  pincode: StringType()
    .isRequired("Pincode is required")
    .addRule((value) => {
      const regex = /^\d{6}$/;
      return regex.test(value);
    }, "Please enter a valid 6 digit pincode."),
  openingTime: StringType().isRequired("OpeningTime is required"),
  closingTime: StringType().isRequired("ClosingTime is required"),
});

const validationUpdateStoreModel = Schema.Model({
  // storeName: StringType().addRule((value) => {
  //   const regex = /^[a-zA-Z ]+$/;
  //   return regex.test(value);
  // }, "Please enter a valid name using only alphabets and space."),
  storeName: StringType()
    .addRule((value, data) => {
      const regex = /^[a-zA-Z ]+$/;
      if (data.storeData && data.storeData.storeName === value) {
        return; 
      }
      if (!value) {
        return "Store Name is required";
      }
      if (!regex.test(value)) {
        return "Please enter a valid name using only alphabets and space.";
      }
    }),

  pincode: StringType().addRule((value) => {
    const regex = /^\d{6}$/;
    return regex.test(value);
  }, "Please enter a valid 6 digit pincode."),
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

export {
  validationModel,
  TextField,
  validationUpdateModel,
  validationAddModel,
  validationUpdateStoreModel,
};
