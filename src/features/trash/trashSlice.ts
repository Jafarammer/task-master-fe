import { createSlice } from "@reduxjs/toolkit";
import { fetchTrash } from "./trashthunk";
import { ITrashResponse } from "../../interfaces/trashInterface";

interface TrashState {
  trashTask: ITrashResponse["data"];
  metaData: ITrashResponse["metaData"];
  loading: boolean;
  error: string | null;
}

const initialState: TrashState = {
  trashTask: [],
  metaData: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const trashSlice = createSlice({
  name: "trashTask",
  initialState,
  reducers: {
    logoutTaskTrash: (state) => {
      state.trashTask = [];
      state.metaData = {
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrash.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrash.fulfilled, (state, action) => {
        state.loading = false;
        state.trashTask = action.payload.data;
        state.metaData = action.payload.metaData;
        state.error = null;
      })
      .addCase(fetchTrash.rejected, (state, action) => {
        state.loading = false;
        state.trashTask = [];
        state.error = action.payload?.message || "Failed to load data trash";
      });
  },
});

export const { logoutTaskTrash } = trashSlice.actions;
export default trashSlice.reducer;
