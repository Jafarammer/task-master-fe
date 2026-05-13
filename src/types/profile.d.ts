export interface IProfileData {
  first_name: string;
  last_name: string;
}

export interface IProfileResponse {
  data: IProfileData;
}

export type ShowPassword = {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};
