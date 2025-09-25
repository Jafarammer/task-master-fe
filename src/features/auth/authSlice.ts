import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authThunk";

type AuthState = {
  user: { firstName: string; lastName: string; email: string } | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        email: action.payload.data.email,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload as string);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
