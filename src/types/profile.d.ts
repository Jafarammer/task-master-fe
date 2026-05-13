export interface IProfileData {
  fullName: string;
  email: string;
}

export interface IProfileResponse {
  data: IProfileData;
}

export interface IUpdateProfilePayload {
  fullName: string;
  email: string;
}

export type ShowPassword = {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};
