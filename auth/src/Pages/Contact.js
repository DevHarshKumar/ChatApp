import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';

const Contact = () => {
  // Validation schema for the form
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name is too short')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .min(10, 'Message should be at least 10 characters')
      .required('Message is required'),
  });

  // Initial values for the form
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  // Handle form submission
  const onSubmit = async(values, { resetForm }) => {
    try {
      await axiosInstance.post('/contact',values);
      console.log('Form Data:', values);
    resetForm();
    alert('Message sent successfully!');
    } catch (error) {
      console.error("error",error)
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      {/* Hero Section */}
      <div className="container px-6 mx-auto text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl mb-8">
          We’d love to hear from you. Please fill out the form below to get in touch.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="container px-6 mx-auto mt-8 text-center md:text-left max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center">Get in Touch</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 font-bold mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-bold mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-600 font-bold mb-2">
                  Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Send Message
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-gray-300 py-4 mt-12 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
