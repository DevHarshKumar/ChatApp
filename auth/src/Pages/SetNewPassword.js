import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';
import { useParams } from 'react-router-dom';

const SetNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message,setMessage]=useState("");
  const {userId,token}=useParams();

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z0-9]/, 'Password must contain only letters and numbers'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values) => {
    const { newPassword, confirmPassword } = values;
    console.log(newPassword, confirmPassword);
    try {
        const response=await axiosInstance.put(`/setNewPassword/${userId}/${token}`,{newPassword,confirmPassword});
        if(response.data.status===200){
            setMessage(response.data.message);
        }
    } catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";

        setMessage(errorMessage)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>        <h5 className="text-3xl font-bold text-center text-gray-900">{message}</h5>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900">Set New Password</h2>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  id="newPassword"
                  value={values.newPassword}
                  onChange={(e) => setFieldValue('newPassword', e.target.value)}
                  placeholder="Enter your new password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                  placeholder="Confirm your new password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {showPassword ? 'Hide Passwords' : 'Show Passwords'}
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Set New Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Remembered your password?</span>
          <NavLink
            to="/login"
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
