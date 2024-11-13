import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/userSlice';
import { NavLink } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const handleSubmit = async (values, { setStatus }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    try {
      const response = await axiosInstance.post('/login', formData);
      if (response.status === 200) {
        setStatus({ success: "Login Successful" });
        dispatch(login(response.data));
      }
    } catch (error) {
      setStatus({ error: "Invalid email or password" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, status }) => (
            <Form className="space-y-6 mt-6">
              {status?.error && <div className="text-red-500">{status.error}</div>}
              {status?.success && <div className="text-green-500">{status.success}</div>}

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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  placeholder="Enter your password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <NavLink 
            to="/register" 
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Register
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

export default Login;
