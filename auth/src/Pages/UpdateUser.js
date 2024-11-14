import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axios';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { updateUserProfileInfo } from '../Redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast("Profile Updated Successfully");

const updateUserSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email format"),
  password: Yup.string()
    .max(12, 'Password should be less than 12 characters')
    .min(8, 'Password should be at least 8 characters'),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact number should be exactly 10 digits"),
  address: Yup.string(),
});

const UpdateUser = () => {
  const { userId } = useParams();
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = async (values) => {
    const data = values;
    try {
      const response = await axiosInstance.put(`/updateUser/${userId}`, { data });
      if (response.status === 200) {
        console.log(response.data.user)
        dispatch(updateUserProfileInfo(response.data.user))
        notify();
        setTimeout(() => {
          navigate(`/profile/${userId}`);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Update User</h2>

        <Formik
          initialValues={{
            name: user ? user.name : '',
            email: user ? user.email : '',
            contact: user ? user.contact : '',
            address: user ? user.address : '',
          }}
          validationSchema={updateUserSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-6 mt-6">
              {/* Name */}
              <div className="text-center">
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

              {/* Email */}
              <div className="text-center">
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

              {/* Contact */}
              <div className="text-center">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
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

              {/* Address */}
              <div className="text-center">
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

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Link to Profile */}
        <div className="text-center mt-4">
          <NavLink
            to={`/profile/${userId}`}
            className="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
          >
            Go to Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
