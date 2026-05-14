import { useState, Dispatch, SetStateAction } from "react";
import { useFormik, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProfile } from "../features/profile/profileThunk";
import useSnackbarAlert from "./useSnackbarAlert";
import { validations } from "../validations";
import { IUpdateProfilePayload } from "../types/profile";
import useLogout from "./useLogout";

type useProfileReturn = {
  formikUpdateProfile: FormikProps<IUpdateProfilePayload>;
  loading: boolean;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
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
        notify(error.error?.response?.data?.message, "error");
      } finally {
        setLoading(false);
        setIsUpdate(false);
      }
    },
  });

  return {
    formikUpdateProfile,
    loading,
    isUpdate,
    setIsUpdate,
  };
};

export default useProfile;
