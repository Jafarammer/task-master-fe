export interface IProfileData {
  fullName: string;
  email: string;
  profilePicture: string;
  requireRelogin?: boolean;
}

export interface IProfileResponse {
  message: string;
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
