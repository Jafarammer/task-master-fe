import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allTaskReducer from "../features/myTask/myTaskSlice";
import completedTaskReducer from "../features/myTask/completedTaskSlice";
import pendingTaskReducer from "../features/myTask/pendingTaskSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  allTask: allTaskReducer,
  completedTask: completedTaskReducer,
  pendingTask: pendingTaskReducer,
});

export default rootReducer;
