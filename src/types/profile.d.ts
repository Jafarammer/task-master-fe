export interface IProfileData {
  fullName: string;
  email: string;
  profilePicture: string;
}

export interface IProfileResponse {
  message: string;
  requireRelogin: boolean;
  data: IProfileData;
}

export interface IUpdateProfilePayload {
  fullName: string;
  email: string;
}

export interface IUpdateProfilePicturePayload {
  profilePicture: File;
}

export interface IUpdateProfilePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ShowPassword = {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};
