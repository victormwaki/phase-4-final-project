import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

export default function Checkout() {
  return (
    <div>
      <h1>Checkout</h1>
      <Formik
        initialValues={{ name: '', email: '', address: '' }}
        validationSchema={validationSchema} // Add validation schema
        onSubmit={(values) => {
          console.log(values); // Handle form submission
        }}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <Field type="text" id="address" name="address" />
            <ErrorMessage name="address" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
