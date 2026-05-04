import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";
import { IProfileResponse } from "../../types/profile";

export const fetchProfile = createAsyncThunk<
  IProfileResponse,
  void,
  { rejectValue: string }
>("profile/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<IProfileResponse>(`/users/profile`);
    return res.data as IProfileResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch profile",
    );
  }
});
