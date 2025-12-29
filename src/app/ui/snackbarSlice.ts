import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarState } from "../../types/global";

const initialState: SnackbarState = {
  open: false,
  color: "success",
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; color?: SnackbarState["color"] }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.color = action.payload.color || "success";
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
