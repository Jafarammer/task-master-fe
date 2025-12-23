import { combineReducers } from "@reduxjs/toolkit";
import allTaskReducer from "../features/myTask/allTaskSlice";
import completedTaskReducer from "../features/myTask/completedTaskSlice";
import pendingTaskReducer from "../features/myTask/pendingTaskSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import profileReducer from "../features/profile/profileSlice";

const rootReducer = combineReducers({
  allTask: allTaskReducer,
  completedTask: completedTaskReducer,
  pendingTask: pendingTaskReducer,
  snackbar: snackbarReducer,
  profile: profileReducer,
});

export default rootReducer;
