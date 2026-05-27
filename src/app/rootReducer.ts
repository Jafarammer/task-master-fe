import { combineReducers } from "@reduxjs/toolkit";
import snackbarReducer from "../features/components/snackbarSlice";
import profileReducer from "../features/profile/profileSlice";
import myTaskReducer from "../features/myTask/myTaskSlice";
import trashReducer from "../features/trash/trashSlice";
const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  profile: profileReducer,
  myTasks: myTaskReducer,
  trash: trashReducer,
});

export default rootReducer;
