import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allTaskReducer from "../features/myTask/myTaskSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  allTask: allTaskReducer,
});

export default rootReducer;
