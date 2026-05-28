import api from "../../app/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IApiParams,
  IApiErrorResponse,
} from "../../interfaces/commonInterface";
import { IMyTaskResponse } from "../../interfaces/myTaskInterface";

export const fetchAllTask = createAsyncThunk<
  IMyTaskResponse,
  IApiParams,
  { rejectValue: IApiErrorResponse }
>("allTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 1,
      sortBy = "createdAt",
      order = "desc",
      query = "",
    } = params;

    const response = await api.get<IMyTaskResponse>("/task", {
      params: { page, limit, sortBy, order, query },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch tasks completed",
    });
  }
});

export const fetchCompletedTask = createAsyncThunk<
  IMyTaskResponse,
  IApiParams,
  { rejectValue: IApiErrorResponse }
>("completedTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 5,
      sortBy = "createdAt",
      order = "desc",
      query = "",
    } = params;

    const response = await api.get<IMyTaskResponse>("/task/completed", {
      params: { page, limit, sortBy, order, query },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch tasks completed",
    });
  }
});

export const fetchPendingTask = createAsyncThunk<
  IMyTaskResponse,
  IApiParams,
  { rejectValue: IApiErrorResponse }
>("pendingTask/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 5,
      sortBy = "createdAt",
      order = "desc",
      query = "",
    } = params;

    const response = await api.get<IMyTaskResponse>("/task/pending", {
      params: { page, limit, sortBy, order, query },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch tasks pending",
    });
  }
});
