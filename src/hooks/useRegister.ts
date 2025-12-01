import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authService";
import { registerSchema } from "../utils/validationSchema";
import { RegisterPayload } from "../types/auth";
import useSnackbarAlert from "./useSnackbarAlert";

type useRegisterReturn = {
  formik: FormikProps<RegisterPayload>;
  loading: boolean;
};

const useRegister = (): useRegisterReturn => {
  // router
  const navigate = useNavigate();
  // hooks
  const notify = useSnackbarAlert();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  // function event
  const formik = useFormik<RegisterPayload>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values): Promise<void> => {
      try {
        setLoading(true);
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        const response = await registerUser(payload);
        notify(response.message, "success");
        navigate("/login");
      } catch (error: any) {
        notify(
          error?.response?.data?.message || "Registration failed",
          "error"
        );
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

export default useRegister;
