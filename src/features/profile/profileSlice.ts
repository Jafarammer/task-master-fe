import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./profileThunk";
import { IProfileResponse } from "../../types/profile";

interface IProfileState {
  items: IProfileResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: IProfileState = {
  items: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logoutProfile: (state) => {
      state.items = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.items = null;
        state.error = action.error.message || "Failed to load data!";
      });
  },
});

export const { logoutProfile } = profileSlice.actions;
export default profileSlice.reducer;
