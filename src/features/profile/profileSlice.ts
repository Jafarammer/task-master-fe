import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "./profileThunk";
import { IProfileData } from "../../interfaces/profileInterface";

interface IProfileState {
  profiles: IProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: IProfileState = {
  profiles: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logoutProfile: (state) => {
      state.profiles = null;
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
        state.profiles = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.profiles = null;
        state.error = action.error.message || "Failed to load data!";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.data;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.profiles = null;
        state.error = action.error.message || "Failed to update profile!";
      });
  },
});

export const { logoutProfile } = profileSlice.actions;
export default profileSlice.reducer;
