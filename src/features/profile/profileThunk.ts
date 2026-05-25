import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";
import {
  IProfileResponse,
  IUpdateProfilePayload,
} from "../../interfaces/profileInterface";
import { IApiErrorResponse } from "../../interfaces/commonInterface";

export const fetchProfile = createAsyncThunk<
  IProfileResponse,
  void,
  { rejectValue: IApiErrorResponse }
>("profile/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/profile`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch profile",
    });
  }
});

export const updateProfile = createAsyncThunk<
  IProfileResponse,
  IUpdateProfilePayload,
  { rejectValue: IApiErrorResponse }
>("profile/update", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.patch("/profile", payload);
    return res.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to update profile",
    });
  }
});
