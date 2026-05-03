import { createSlice } from "@reduxjs/toolkit";
import { fetchCompletedTask } from "./completedTaskThunk";
import { IMyTaskResponse } from "../../types/myTask";

interface CompletedTaskState {
  items: IMyTaskResponse["data"];
  meta_data: IMyTaskResponse["meta_data"];
  loading: boolean;
  error: string | null;
}

const initialState: CompletedTaskState = {
  items: [],
  meta_data: {
    page: 1,
    limit: 5,
    total: 0,
    total_pages: 0,
  },
  loading: false,
  error: null,
};

const completedTaskSlice = createSlice({
  name: "completedTask",
  initialState,
  reducers: {
    logoutCompletedTask: (state) => {
      state.items = [];
      state.meta_data = {
        page: 1,
        limit: 5,
        total: 0,
        total_pages: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.meta_data = action.payload.meta_data;
        state.error = null;
      })
      .addCase(fetchCompletedTask.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message || "Failed to load data!";
      });
  },
});

export const { logoutCompletedTask } = completedTaskSlice.actions;
export default completedTaskSlice.reducer;
