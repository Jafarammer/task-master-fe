import api from "../../api/axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../../types/auth";

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", payload);
  return res.data;
};
