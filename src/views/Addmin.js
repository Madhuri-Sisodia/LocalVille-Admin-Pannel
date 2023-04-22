// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const Addmin = () => {
//   return (
//     <div>
//       <h1>My Form</h1>
//       <Formik
//         initialValues={{ name: '', email: '', message: '' }}
//         validationSchema={Yup.object({
//           name: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//           email: Yup.string()
//             .email('Invalid email address')
//             .required('Required'),
//           message: Yup.string()
//             .max(250, 'Must be 250 characters or less')
//             .required('Required'),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             setSubmitting(false);
//           }, 400);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <label htmlFor="name">Name</label>
//             <Field type="text" name="name" />
//             <ErrorMessage name="name" />

//             <label htmlFor="email">Email</label>
//             <Field type="email" name="email" />
//             <ErrorMessage name="email" />

//             <label htmlFor="message">Message</label>
//             <Field as="textarea" name="message" />
//             <ErrorMessage name="message" />

//             <button type="submit" disabled={isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Addmin;



import React from 'react';
import ReactDOM from 'react-dom';
import NotificationAlert from "react-notification-alert";
import { SuccessNotify } from "components/NotificationShowPopUp";
import { ErrorNotify } from "components/NotificationShowPopUp";
import { Http } from "../config/Service";


import { Form, Button, ButtonToolbar, Schema, Panel, FlexboxGrid } from 'rsuite';



  

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  aName: StringType().isRequired('This field is required.'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  
  password: StringType().isRequired('This field is required.'),
  rePassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
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

const Addmin = () => {
  const formRef = React.useRef();
  const notificationAlertRef = React.useRef(null);
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
     aName: '',
    email: '',
  
    password: '',
    rePassword: ''
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
   
    else {
      console.log("form....", formValue);
      var data = new FormData();
      data.append("name", formValue.aName);
      data.append("email", formValue.email);
      data.append("password", formValue.password);

      Http.PostAPI(process.env.REACT_APP_ADDADMINDATA, data, null)
        .then((res) => {
          if (res?.data?.status) {
            setUser(res?.data?.data);
            notificationAlertRef.current.notificationAlert(
              SuccessNotify(res?.data?.message)
            );
          } else {
            notificationAlertRef.current.notificationAlert(
              ErrorNotify(res?.data?.message)
            );
          }
        })
        .catch((e) => {
          notificationAlertRef.current.notificationAlert(
            ErrorNotify("Something went wrong")
          );
        });
      setFormValue({
        aName: "",
        email: "",
        password: "",
        rePassword: "",
      });
      // setFormError(validationModel)

      //  formRef.current.reset();
      // formRef.current.state.formValue = "";
    }
  };

 

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <TextField name="aName" label="Username" />
          <TextField name="email" label="Email" />
      
          <TextField name="password" label="Password" type="password" autoComplete="off" />
          <TextField
            name="rePassword"
            label="Verify password"
            type="password"
            autoComplete="off"
          />

          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>

   
          </ButtonToolbar>
        </Form>
      </FlexboxGrid.Item>
      
    </FlexboxGrid>
    </>
  );
};
export default Addmin;


  



