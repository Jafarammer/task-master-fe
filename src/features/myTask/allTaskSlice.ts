import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTask } from "./allTaskThunk";
import { IAllTaskData, IAllTaskResponse } from "./types";

interface AllTaskState {
  items: IAllTaskData[];
  meta_data: IAllTaskResponse["meta_data"];
  loading: boolean;
  error: string | null;
}

const initialState: AllTaskState = {
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

const allTaskSlice = createSlice({
  name: "allTasks",
  initialState,
  reducers: {
    logout: (state) => {
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
      .addCase(fetchAllTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.meta_data = action.payload.meta_data;
        state.error = null;
      })
      .addCase(fetchAllTask.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message || "Failed to load data!";
      });
  },
});

export const { logout } = allTaskSlice.actions;
export default allTaskSlice.reducer;
