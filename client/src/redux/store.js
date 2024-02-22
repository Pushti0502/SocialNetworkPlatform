import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import { combineReducers } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export default store;
