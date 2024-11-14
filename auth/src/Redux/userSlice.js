import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  userId: localStorage.getItem('userId') || null,
  error: null,
  loading: false,
  isAdmin: localStorage.getItem('isAdmin') || false,
  isUser: localStorage.getItem('isUser') || false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('userId', action.payload.user._id);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);

      state.userId = action.payload.user._id;
      state.user = action.payload.user;

      if (action.payload.role === 'isAdmin') {
        state.isAdmin = true;
        state.isUser = false;
      } else {
        state.isAdmin = false;
        state.isUser = true;
      }
    },
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      // Reset Redux state
      state.userId = null;
      state.user = {};
      state.isAdmin = false;
      state.isUser = false;
    },
    checkAuth: (state) => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const userId = localStorage.getItem('userId');

        if (token && user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser.role === 'admin') {
            state.isAdmin = true;
            state.isUser = false;
            state.user = parsedUser;
            state.token = token;
            state.userId = userId;
          } else if (parsedUser.role === 'customer') {
            state.isUser = true;
            state.isAdmin = false;
            state.user = parsedUser;
            state.token = token;
            state.userId = userId;
          }
        } else {
          state.isAdmin = false;
          state.isUser = false;
          state.user = null;
          state.token = null;
          state.userId = null;

        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        state.isAdmin = false;
        state.isUser = false;
        state.user = null;
        state.token = null;
        state.userId = null;
      }
    },
    updateUserProfileInfo:(state,action)=>{
      state.user=action.payload;
      localStorage.setItem('user',JSON.stringify(action.payload))
    }
  }
});

export const { login, logout ,checkAuth,updateUserProfileInfo} = userSlice.actions;
export default userSlice.reducer;
