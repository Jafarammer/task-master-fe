import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAllTaskParams, IAllTaskResponse } from "./types";

export const fetchPendingTask = createAsyncThunk<
  IAllTaskResponse,
  IAllTaskParams | undefined,
  { rejectValue: string }
>("pendingTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 5,
      sort_by = "createdAt",
      order = "desc",
      search = "",
    } = params || {};

    const response = await axios.get("/task/pending", {
      params: { page, limit, sort_by, order, search },
    });

    return response.data as IAllTaskResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch tasks pending"
    );
  }
});
