import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authService";
import { loginSchema } from "../utils/validationSchema";
import { LoginPayload } from "../types/auth";
import useSnackbarAlert from "./useSnackbarAlert";

type UseLoginReturn = {
  formik: FormikProps<LoginPayload>;
  loading: boolean;
};

const useLogin = (): UseLoginReturn => {
  // router
  const navigate = useNavigate();
  // hooks
  const [cookies, setCookie] = useCookies(["token"]);
  const notify = useSnackbarAlert();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  // function event
  const formik = useFormik<LoginPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
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
          maxAge: 60 * 60 * 24, // 1 hari
          // hanya aktifkan secure di production (HTTPS)
          // ...(process.env.NODE_ENV === "production"
          //   ? { secure: true, sameSite: "strict" as const }
          //   : { sameSite: "lax" as const }),
        });
        navigate("/my-task");
        notify(response.message, "success");
      } catch (error: any) {
        if (error.status === 400) {
          const msg: string = error?.response?.data?.message;
          if (
            /password|wrong password|incorrect password|invalid password/i.test(
              msg
            )
          ) {
            setFieldError("password", msg);
            return;
          }
          if (
            /email|not found|no account|user not found|not registered/i.test(
              msg
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

  return {
    formik,
    loading,
  };
};

export default useLogin;
