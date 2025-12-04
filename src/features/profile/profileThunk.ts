import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { TprofileResponse } from "../../types/profile";

export const fetchProfile = createAsyncThunk<
  TprofileResponse,
  void,
  { rejectValue: string }
>("profile/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/users/profile`);
    return response.data as TprofileResponse;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch profile"
    );
  }
});
