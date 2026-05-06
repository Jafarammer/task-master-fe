import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllTask,
  fetchCompletedTask,
  fetchPendingTask,
} from "./myTaskThunk";
import { IMyTaskResponse } from "../../types/myTask";

interface MyTaskState {
  items: IMyTaskResponse["data"];
  meta_data: IMyTaskResponse["meta_data"];
  loading: boolean;
  error: string | null;
  activeTab: "all" | "completed" | "pending";
}

const initialState: MyTaskState = {
  items: [],
  meta_data: {
    page: 1,
    limit: 5,
    total: 0,
    total_pages: 0,
  },
  loading: false,
  error: null,
  activeTab: "all",
};

const pendingReducer = (state: MyTaskState) => {
  state.loading = true;
  state.error = null;
};

const fulFilledReducer = (
  state: MyTaskState,
  action: PayloadAction<IMyTaskResponse>,
) => {
  state.loading = false;
  state.items = action.payload.data;
  state.meta_data = action.payload.meta_data;
  state.error = null;
};

const rejectedReducer = (state: MyTaskState, action: any) => {
  state.loading = false;
  state.items = [];
  state.error = action.error.message || "Failed to load data!";
};

const myTaskSlice = createSlice({
  name: "myTasks",
  initialState,
  reducers: {
    logOutMyTask: (state) => {
      state.items = [];
      state.meta_data = {
        page: 1,
        limit: 5,
        total: 0,
        total_pages: 0,
      };
      state.loading = false;
      state.error = null;
      state.activeTab = "all";
    },
    setActiveTab: (
      state,
      action: PayloadAction<"all" | "completed" | "pending">,
    ) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // all
      .addCase(fetchAllTask.pending, pendingReducer)
      .addCase(fetchAllTask.fulfilled, fulFilledReducer)
      .addCase(fetchAllTask.rejected, rejectedReducer)
      // completed
      .addCase(fetchCompletedTask.pending, pendingReducer)
      .addCase(fetchCompletedTask.fulfilled, fulFilledReducer)
      .addCase(fetchCompletedTask.rejected, rejectedReducer)
      // pending
      .addCase(fetchPendingTask.pending, pendingReducer)
      .addCase(fetchPendingTask.fulfilled, fulFilledReducer)
      .addCase(fetchPendingTask.rejected, rejectedReducer);
  },
});

export const { logOutMyTask, setActiveTab } = myTaskSlice.actions;
export default myTaskSlice.reducer;
