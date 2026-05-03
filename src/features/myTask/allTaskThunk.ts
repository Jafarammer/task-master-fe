import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMyTaskParams, IMyTaskResponse } from "../../types/myTask";

export const fetchAllTask = createAsyncThunk<
  IMyTaskResponse,
  IMyTaskParams | undefined,
  { rejectValue: string }
>("allTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 1,
      sort_by = "createdAt",
      order = "desc",
      search = "",
    } = params || {};

    const response = await api.get("/task", {
      params: { page, limit, sort_by, order, search },
    });

    return response.data as IMyTaskResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch tasks",
    );
  }
});
