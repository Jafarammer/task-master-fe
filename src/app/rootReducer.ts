import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allTaskReducer from "../features/myTask/allTaskSlice";
import completedTaskReducer from "../features/myTask/completedTaskSlice";
import pendingTaskReducer from "../features/myTask/pendingTaskSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import profileReducer from "../features/profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  allTask: allTaskReducer,
  completedTask: completedTaskReducer,
  pendingTask: pendingTaskReducer,
  snackbar: snackbarReducer,
  profile: profileReducer,
});

export default rootReducer;
