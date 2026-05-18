import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSnackbarAlert from "./useSnackbarAlert";
import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "../types/auth";
import { validations } from "../validations";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../services/authService";

type UseAuthReturn = {
  formikLogin: FormikProps<LoginPayload>;
  formikRegister: FormikProps<RegisterPayload>;
  formikForgotPassword: FormikProps<ForgotPasswordPayload>;
  formikResetPassword: FormikProps<ResetPasswordPayload>;
  loading: boolean;
};

const useAuth = (): UseAuthReturn => {
  // router
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // hooks
  const [cookies, setCookie] = useCookies(["token"]);
  const notify = useSnackbarAlert();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  // formik
  const formikLogin = useFormik<LoginPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validations.login,
    onSubmit: async (values, { setFieldError }): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          email: values.email,
          password: values.password,
        };
        const response = await loginUser(payload);
        setCookie("token", response.accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
        });
        navigate("/my-task");
        notify(response.message, "success");
      } catch (error: any) {
        if (error.status === 400) {
          const msg: string = error?.response?.data?.message;
          if (
            /password|wrong password|incorrect password|invalid password/i.test(
              msg,
            )
          ) {
            setFieldError("password", msg);
            return;
          }
          if (
            /email|not found|no account|user not found|not registered/i.test(
              msg,
            )
          ) {
            setFieldError("email", msg);
            return;
          }
        } else {
          notify(error?.response?.data?.message || "Login failed", "error");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const formikRegister = useFormik<RegisterPayload>({
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
        };
        const response = await registerUser(payload);
        notify(response.message, "success");
        navigate("/login");
      } catch (error: any) {
        notify(
          error?.response?.data?.message || "Registration failed",
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const formikForgotPassword = useFormik<ForgotPasswordPayload>({
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
        notify(error?.response?.data?.message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const formikResetPassword = useFormik<ResetPasswordPayload>({
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
        notify(error?.response?.data?.message, "error");
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
