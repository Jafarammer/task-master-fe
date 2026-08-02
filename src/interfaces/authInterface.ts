import { InternalAxiosRequestConfig } from "axios";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface RefreshTokenResponse {
  message: string;
  accessToken: string;
}
