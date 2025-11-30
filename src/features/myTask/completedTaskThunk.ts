import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAllTaskParams, IAllTaskResponse } from "./types";

export const fetchCompletedTask = createAsyncThunk<
  IAllTaskResponse,
  IAllTaskParams | undefined,
  { rejectValue: string }
>("completedTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 5,
      sort_by = "createdAt",
      order = "desc",
    } = params || {};

    const response = await axios.get("/task/completed", {
      params: { page, limit, sort_by, order },
    });
    return response.data as IAllTaskResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch tasks completed"
    );
  }
});
