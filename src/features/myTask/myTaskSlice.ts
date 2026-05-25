import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllTask,
  fetchCompletedTask,
  fetchPendingTask,
} from "./myTaskThunk";
import { IMyTaskResponse } from "../../interfaces/myTaskInterface";

interface MyTaskState {
  tasks: IMyTaskResponse["data"];
  metaData: IMyTaskResponse["metaData"];
  loading: boolean;
  error: string | null;
  activeTab: "all" | "completed" | "pending";
}

const initialState: MyTaskState = {
  tasks: [],
  metaData: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
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
  state.tasks = action.payload.data;
  state.metaData = action.payload.metaData;
  state.error = null;
};

const rejectedReducer = (state: MyTaskState, action: any) => {
  state.loading = false;
  state.tasks = [];
  state.error = action.payload?.message || "Failed to load data!";
};

const myTaskSlice = createSlice({
  name: "myTasks",
  initialState,
  reducers: {
    logOutMyTask: (state) => {
      state.tasks = [];
      state.metaData = {
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 0,
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
