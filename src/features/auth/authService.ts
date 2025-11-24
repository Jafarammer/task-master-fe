import api from "../../api/axios";
import { LoginPayload, LoginResponse } from "../../types/login";

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
};
