export interface IProfileData {
  fullName: string;
  email: string;
}

export interface IProfileResponse {
  data: IProfileData;
}

export type ShowPassword = {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};
