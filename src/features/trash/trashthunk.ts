import api from "../../app/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IApiErrorResponse,
  IApiParams,
} from "../../interfaces/commonInterface";
import { ITrashResponse } from "../../interfaces/trashInterface";

export const fetchTrash = createAsyncThunk<
  ITrashResponse,
  IApiParams,
  { rejectValue: IApiErrorResponse }
>("trash/fetch", async (params, { rejectWithValue }) => {
  try {
    const {
      page = 1,
      limit = 1,
      sortBy = "createdAt",
      order = "desc",
      query = "",
    } = params as IApiParams;

    const response = await api.get("/task/trash", {
      params: { page, limit, sortBy, order, query },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch trash",
    });
  }
});
