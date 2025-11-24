import React, { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authService";
import { registerSchema } from "../utils/validationSchema";
import { RegisterPayload } from "../types/auth";
import { SnackbarState } from "../types/global";
import { SnackbarCloseReason } from "@mui/material";

type useRegisterReturn = {
  formik: FormikProps<RegisterPayload>;
  loading: boolean;
  openSnackbar: SnackbarState;
  onCloseSnackbar: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
};

const useRegister = (): useRegisterReturn => {
  // router
  const navigate = useNavigate();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarState>({
    open: false,
    color: "success",
    message: "",
  });
  // function event
  const onCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ): void => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

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

        setOpenSnackbar({
          open: true,
          color: "success",
          message: response.message,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error: any) {
        setOpenSnackbar({
          open: true,
          color: "error",
          message: error.response?.data?.error || "Registration failed",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    formik,
    loading,
    openSnackbar,
    onCloseSnackbar,
  };
};

export default useRegister;
