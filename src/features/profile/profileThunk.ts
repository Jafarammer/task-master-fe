import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";
import { IProfileResponse, IUpdateProfilePayload } from "../../types/profile";

export const fetchProfile = createAsyncThunk<
  IProfileResponse,
  void,
  { rejectValue: string }
>("profile/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<IProfileResponse>(`/profile`);
    return res.data as IProfileResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch profile",
    );
  }
});

export const updateProfile = createAsyncThunk<
  IProfileResponse,
  IUpdateProfilePayload,
  { rejectValue: string }
>("profile/update", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.patch<IProfileResponse>("/profile", payload);
    return res.data as IProfileResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update profile",
    );
  }
});
