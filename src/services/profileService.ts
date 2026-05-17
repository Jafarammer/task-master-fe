import api from "../app/api";
import {
  IProfileResponse,
  IUpdateProfilePicturePayload,
  IUpdateProfilePasswordPayload,
} from "../types/profile";

export const updateProfilePicture = async (
  payload: IUpdateProfilePicturePayload,
): Promise<IProfileResponse> => {
  const formData = new FormData();
  formData.append("profilePicture", payload.profilePicture);

  const res = await api.patch<IProfileResponse>("/profile/picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProfilePassword = async (
  payload: IUpdateProfilePasswordPayload,
): Promise<IProfileResponse> => {
  const res = await api.patch<IProfileResponse>(
    "/auth/change-password",
    payload,
  );
  return res.data;
};
