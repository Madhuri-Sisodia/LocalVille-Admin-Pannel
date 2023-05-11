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
  password: StringType().isRequired("Password is required.").addRule((value, data)=>{
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return regex.test(value);
  },"password length should be 8 character and must contain 1 numeric, uppercase and symbol. "),
  rePassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      

      // return true;
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

const addAttributeValidationModel = Schema.Model({
  price: StringType().addRule((value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  }, "Please enter a valid price using only numbers."),
  discountPrice: StringType().addRule((value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  }, "Please enter a valid discount price using only numbers."),
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
  storeName: StringType().addRule((value) => {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(value);
  }, "Please enter a valid name using only alphabets and space."),

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
  addAttributeValidationModel,
};
