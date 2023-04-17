import React from "react";
import {Schema} from "rsuite";

const { StringType } = Schema.Types;

const validationModel = Schema.Model({
  adminName: StringType().isRequired("Admin Name is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Admin Email is required."),
  password: StringType().isRequired("Password is required."),
  rePassword: StringType()
    .addRule(
      (value, data) => value === data.password,
      "Passwords must match."
    )
    .isRequired("Re-enter Password is required."),
});

export default validationModel;


