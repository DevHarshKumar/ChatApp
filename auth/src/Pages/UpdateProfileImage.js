import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateUserProfileInfo } from '../Redux/userSlice';
import * as Yup from 'yup';

const UpdateProfileImage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = async (values) => {
    const formdata = new FormData();
    Object.keys(values).forEach((key) => {
      formdata.append(key, values[key]);
    });

    try {
      const response = await axiosInstance.put(`/updateProfileImage/${user._id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        dispatch(updateUserProfileInfo(response.data.user))
        setTimeout(() => {
          navigate(`/profile/${user._id}`);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Update Profile Image</h2>

        <Formik
          initialValues={{
            name: user.name,
            profileImage: null,
          }}
          validationSchema={Yup.object({
            profileImage: Yup.mixed().required("Profile image is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-6 mt-6">
              <div className="flex justify-center mt-6">
                <img
                  src={`http://localhost:5000/${user.profileImage}` || '/boy.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
                <Field
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("profileImage", file);
                    if (file) {
                      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
                    }
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="profileImage" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="flex justify-center mt-6">
              {imagePreview && <img src={imagePreview} alt='preview' className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"/>}
              </div>
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
      </div>
    </div>
  );
};

export default UpdateProfileImage;
