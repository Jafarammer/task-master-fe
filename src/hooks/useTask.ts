import React, { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { taskSchema } from "../utils/validationSchema";
import { createTask } from "../services/taskService";
import { CreateTaskPayload } from "../types/task";
import { SnackbarState } from "../types/global";
import { SnackbarCloseReason } from "@mui/material";
import dayjs from "dayjs";

type useTaskReturn = {
  formik: FormikProps<CreateTaskPayload>;
  loading: boolean;
  openSnackbar: SnackbarState;
  onCloseSnackbar: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
};

const useTask = (): useTaskReturn => {
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
  const formik = useFormik<CreateTaskPayload>({
    initialValues: {
      title: "",
      description: "",
      due_date: dayjs().startOf("day").format("YYYY-MM-DD"),
      priority: "",
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          title: values.title,
          description: values.description,
          due_date: values.due_date,
          priority: values.priority,
        };
        const response = await createTask(payload);
        setOpenSnackbar({
          open: true,
          color: "success",
          message: response.message,
        });
        setTimeout(() => {
          navigate("/my-task");
        }, 1500);
      } catch (error: any) {
        setOpenSnackbar({
          open: true,
          color: "error",
          message: error?.response?.data?.message || "Create task failed",
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

export default useTask;
