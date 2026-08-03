import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSnackbarAlert from "./useSnackbarAlert";
import {
  IRegisterPayload,
  IForgotPasswordPayload,
  ILoginPayload,
  IResetPasswordPayload,
} from "../interfaces/authInterface";
import { validations } from "../validations";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../services/authService";
import { setAccessToken } from "../utils/auth";
import { parseApiError } from "../utils/apiError";

type UseAuthReturn = {
  formikLogin: FormikProps<ILoginPayload>;
  formikRegister: FormikProps<IRegisterPayload>;
  formikForgotPassword: FormikProps<IForgotPasswordPayload>;
  formikResetPassword: FormikProps<IResetPasswordPayload>;
  loading: boolean;
};

const useAuth = (): UseAuthReturn => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // hooks
  const notify = useSnackbarAlert();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  // formik
  const formikLogin = useFormik<ILoginPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validations.login,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          email: values.email,
          password: values.password,
        };
        const response = await loginUser(payload);
        setAccessToken(response.accessToken);
        navigate("/my-task");
        notify(response.message, "success");
      } catch (error: any) {
        const { status, message } = parseApiError(error);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const formikRegister = useFormik<IRegisterPayload>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validations.register,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
        const response = await registerUser(payload);
        notify(response.message, "success");
        navigate("/login");
      } catch (error: any) {
        const { status, message } = parseApiError(error);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const formikForgotPassword = useFormik<IForgotPasswordPayload>({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: validations.forgotPassword,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          email: values.email,
        };
        const response = await forgotPassword(payload);
        notify(response.message, "success");
        formikForgotPassword.resetForm();
      } catch (error: any) {
        const { status, message } = parseApiError(error);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const formikResetPassword = useFormik<IResetPasswordPayload>({
    enableReinitialize: true,
    initialValues: {
      token: searchParams.get("token") ?? "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validations.resetPassword,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          token: values.token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };
        const response = await resetPassword(payload);
        notify(response.message, "success");
        navigate("/login");
      } catch (error: any) {
        const { status, message } = parseApiError(error);
        notify(message, "error");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    loading,
    formikLogin,
    formikRegister,
    formikForgotPassword,
    formikResetPassword,
  };
};

export default useAuth;
