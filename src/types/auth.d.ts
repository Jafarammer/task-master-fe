export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  message: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type RegisterResponse = {
  message: string;
};

export type ShowPassword = {
  password: boolean;
  confirmPassword: boolean;
};
