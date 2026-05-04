import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "./ui/snackbarSlice";
import {} from // profileReducer,
// allTaskReducer,
// completedTaskReducer,
// pendingTaskReducer,
"@task-master/core-fe";
import allTaskReducer from "../features/myTask/allTaskSlice";
import pendingTaskReducer from "../features/myTask/pendingTaskSlice";
import completedTaskReducer from "../features/myTask/completedTaskSlice";
import profileReducer from "../features/profile/profikeSlice";
const rootReducer = combineReducers({
  allTask: allTaskReducer,
  completedTask: completedTaskReducer,
  pendingTask: pendingTaskReducer,
  snackbar: snackbarReducer,
  profile: profileReducer,
});

export default rootReducer;
