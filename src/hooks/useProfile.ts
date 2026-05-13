import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useSnackbarAlert from "./useSnackbarAlert";
import { validations } from "../validations";
import { IUpdateProfilePayload } from "../types/profile";

type useProfileReturn = {
  formikUpdateProfile: FormikProps<IUpdateProfilePayload>;
  loading: boolean;
};

const useProfile = (): useProfileReturn => {
  // redux
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.profile);
  // hooks
  const notify = useSnackbarAlert();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  // formik
  const formikUpdateProfile = useFormik<IUpdateProfilePayload>({
    enableReinitialize: true,
    initialValues: {
      fullName: items?.data.fullName ?? "",
      email: items?.data.email ?? "",
    },
    validationSchema: validations.updateProfile,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
      } catch (error: any) {
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    formikUpdateProfile,
    loading,
  };
};

export default useProfile;
