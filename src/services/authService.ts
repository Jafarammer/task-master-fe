import api from "../app/api";
import {
  ILoginPayload,
  IRegisterPayload,
  IForgotPasswordPayload,
  IResetPasswordPayload,
} from "../interfaces/authInterface";

export const loginUser = async (
  payload: ILoginPayload,
): Promise<{ accessToken: string; message: string }> => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const registerUser = async (
  payload: IRegisterPayload,
): Promise<{ message: string }> => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const forgotPassword = async (
  payload: IForgotPasswordPayload,
): Promise<{ message: string }> => {
  const res = await api.post("/auth/forgot-password", payload);
  return res.data;
};

export const resetPassword = async (
  payload: IResetPasswordPayload,
): Promise<{ message: string }> => {
  const res = await api.post("/auth/reset-password", payload);
  return res.data;
};
