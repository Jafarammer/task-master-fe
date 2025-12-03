import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IAllTaskParams, IAllTaskResponse } from "./types";

export const fetchAllTask = createAsyncThunk<
  IAllTaskResponse,
  IAllTaskParams | undefined,
  { rejectValue: string }
>("myTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 1,
      sort_by = "createdAt",
      order = "desc",
      search = "",
    } = params || {};

    const response = await axios.get("/task", {
      params: { page, limit, sort_by, order, search },
    });

    return response.data as IAllTaskResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch tasks"
    );
  }
});
