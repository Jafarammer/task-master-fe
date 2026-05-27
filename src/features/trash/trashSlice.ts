import { createSlice } from "@reduxjs/toolkit";
import { fetchTrash, fetchTrashStatistics } from "./trashthunk";
import {
  ITrashResponse,
  ITrashStatisticsResponse,
} from "../../interfaces/trashInterface";

interface TrashState {
  trashTask: ITrashResponse["data"];
  metaData: ITrashResponse["metaData"];
  statistics: ITrashStatisticsResponse["data"] | null;
  loading: boolean;
  loadingStatistic: boolean;
  error: string | null;
  errorStatistic: string | null;
}

const initialState: TrashState = {
  trashTask: [],
  metaData: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  },
  statistics: null,
  loading: false,
  loadingStatistic: false,
  error: null,
  errorStatistic: null,
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
      state.statistics = null;
      state.loading = false;
      state.loadingStatistic = false;
      state.error = null;
      state.errorStatistic = null;
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
      })
      .addCase(fetchTrashStatistics.pending, (state) => {
        state.loadingStatistic = true;
        state.errorStatistic = null;
      })
      .addCase(fetchTrashStatistics.fulfilled, (state, action) => {
        state.loadingStatistic = false;
        state.statistics = action.payload.data;
        state.errorStatistic = null;
      })
      .addCase(fetchTrashStatistics.rejected, (state, action) => {
        state.loadingStatistic = false;
        state.statistics = null;
        state.errorStatistic =
          action.payload?.message || "Failed to load data trash statistics";
      });
  },
});

export const { logoutTaskTrash } = trashSlice.actions;
export default trashSlice.reducer;
