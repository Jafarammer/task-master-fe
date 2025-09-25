import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import type { RegisterPayload } from "./types";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const data = await axios.post("/users/register", payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register Failed"
      );
    }
  }
);
