import api from "../app/api";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/auth";

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", payload);
  return res.data;
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const res = await api.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload,
  );
  return res.data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> => {
  const res = await api.post<ResetPasswordResponse>(
    "/auth/reset-password",
    payload,
  );
  return res.data;
};
