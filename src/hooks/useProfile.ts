import {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  ChangeEventHandler,
  RefObject,
} from "react";
import { useFormik, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProfile, fetchProfile } from "../features/profile/profileThunk";
import {
  updateProfilePicture,
  updateProfilePassword,
} from "../services/profileService";
import useSnackbarAlert from "./useSnackbarAlert";
import { validations } from "../validations";
import {
  IUpdateProfilePayload,
  IUpdateProfilePasswordPayload,
} from "../types/profile";
import useLogout from "./useLogout";

type useProfileReturn = {
  formikUpdateProfile: FormikProps<IUpdateProfilePayload>;
  loading: boolean;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  fileInputRef: RefObject<HTMLInputElement>;
  onChangePicture: ChangeEventHandler<HTMLInputElement>;
  loadingUpdatePicture: boolean;
  formikUpdateProfilePasswrod: FormikProps<IUpdateProfilePasswordPayload>;
  laodingUpdatePassword: boolean;
};

const useProfile = (): useProfileReturn => {
  // redux
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.profile);
  // hooks
  const notify = useSnackbarAlert();
  const { onLogout } = useLogout();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [loadingUpdatePicture, setloadingUpdatePicture] =
    useState<boolean>(false);
  const [laodingUpdatePassword, setLoadingUpdatePassword] =
    useState<boolean>(false);
  // reff
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // formik
  const formikUpdateProfile = useFormik<IUpdateProfilePayload>({
    enableReinitialize: true,
    initialValues: {
      fullName: items?.data?.fullName ?? "",
      email: items?.data?.email ?? "",
    },
    validationSchema: validations.updateProfile,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          fullName: values.fullName,
          email: values.email,
        };
        const res = await dispatch(updateProfile(payload)).unwrap();
        notify(res.message, "success");
        if (res.requireRelogin) {
          onLogout();
        }
      } catch (error: any) {
        notify(error?.response?.data?.message, "error");
      } finally {
        setLoading(false);
        setIsUpdate(false);
      }
    },
  });
  const formikUpdateProfilePasswrod = useFormik<IUpdateProfilePasswordPayload>({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validations.updateProfilePassword,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoadingUpdatePassword(true);
        const payload = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };
        const response = await updateProfilePassword(payload);
        notify(response.message, "success");
        if (response.requireRelogin) {
          onLogout();
        }
      } catch (error: any) {
        notify(error?.response?.data?.message, "error");
      } finally {
        setLoadingUpdatePassword(false);
      }
    },
  });
  // function event
  const onChangePicture: ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setloadingUpdatePicture(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const payload = {
        profilePicture: file,
      };

      const response = await updateProfilePicture(payload);
      notify(response.message, "success");
      dispatch(fetchProfile());
    } catch (error: any) {
      notify(
        error.response?.data?.message || "Failed to update profile picture",
        "error",
      );
    } finally {
      setloadingUpdatePicture(false);
    }
  };

  return {
    formikUpdateProfile,
    loading,
    isUpdate,
    setIsUpdate,
    fileInputRef,
    onChangePicture,
    loadingUpdatePicture,
    formikUpdateProfilePasswrod,
    laodingUpdatePassword,
  };
};

export default useProfile;
