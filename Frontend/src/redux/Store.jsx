import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'
import { userSlice } from './UserSlice';

export const store = configureStore({
  reducer: {
    user : userReducer
  },
})