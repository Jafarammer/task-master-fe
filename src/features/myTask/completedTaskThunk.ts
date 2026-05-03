import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { IMyTaskParams, IMyTaskResponse } from "../../types/myTask";

export const fetchCompletedTask = createAsyncThunk<
  IMyTaskResponse,
  IMyTaskParams | undefined,
  { rejectValue: string }
>("completedTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 5,
      sort_by = "createdAt",
      order = "desc",
      search = "",
    } = params || {};

    const response = await api.get("/task/completed", {
      params: { page, limit, sort_by, order, search },
    });
    return response.data as IMyTaskResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch tasks completed",
    );
  }
});
