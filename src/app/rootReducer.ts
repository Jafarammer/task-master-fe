import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "./ui/snackbarSlice";
import {
  profileReducer,
  allTaskReducer,
  completedTaskReducer,
  pendingTaskReducer,
} from "@task-master/core-fe";

const rootReducer = combineReducers({
  allTask: allTaskReducer,
  completedTask: completedTaskReducer,
  pendingTask: pendingTaskReducer,
  snackbar: snackbarReducer,
  profile: profileReducer,
});

export default rootReducer;
