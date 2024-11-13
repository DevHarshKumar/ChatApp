import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast("User Registered Successfully");

const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .max(12, 'Password should be less than 12 characters')
    .min(8, 'Password should be at least 8 characters')
    .required("Password is required"),
  profileImage: Yup.mixed().required("Profile image is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact number should be exactly 10 digits")
    .required("Contact number is required"),
  address: Yup.string().required("Address is required"),
});



const Register = () => {
  const navigate=useNavigate();

  const handleSubmit = async(values) => {
    const formdata = new FormData();
    Object.keys(values).forEach((key) => {
      formdata.append(key, values[key]);
    });
  
    try {
      const response = await axiosInstance.post('/register', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response,"response ststus:",response.status)
      if(response.status===200){
        notify();
        navigate('/');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 pt-4 rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Register</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            contact: '',
            address: '',
            profileImage: null,
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-6 mt-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  placeholder="Enter your name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  placeholder="Enter your email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type={values.password ? "password" : "text"} // Toggle password visibility
                  name="password"
                  id="password"
                  value={values.password}
                  placeholder="Enter your password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <img
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 md:w-8" // Responsive width
                  src="/view.png"
                  alt="toggle password visibility"
                  onClick={() => {
                    // Toggle password visibility
                    const passwordField = document.getElementById('password');
                    passwordField.type = passwordField.type === "password" ? "text" : "password";
                  }}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                <Field
                  type="text"
                  name="contact"
                  id="contact"
                  value={values.contact}
                  placeholder="Enter your contact number"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="contact" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Field
                  type="text"
                  name="address"
                  id="address"
                  value={values.address}
                  placeholder="Enter your address"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("profileImage", file);
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="profileImage" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account?</span>
          <NavLink 
            to="/login" 
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Login
          </NavLink>
        </div>

        <div className="text-center mt-2">
          <NavLink 
            to="/forgotPassword" 
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Forgot Password?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
