import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "../features/components/snackbarSlice";
import profileReducer from "../features/profile/profileSlice";
import myTaskReducer from "../features/myTask/myTaskSlice";
const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  profile: profileReducer,
  myTasks: myTaskReducer,
});

export default rootReducer;
