import React, { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { taskSchema } from "../utils/validationSchema";
import {
  createTask,
  deleteTask,
  updateStatusTask,
  updateTask,
} from "../services/taskService";
import { CreateTaskPayload, UpdateStatusPaylod } from "../types/task";
import { SnackbarState } from "../types/global";
import { SnackbarCloseReason } from "@mui/material";
import dayjs from "dayjs";
import { fetchAllTask } from "../features/myTask/allTaskThunk";
import { fetchCompletedTask } from "../features/myTask/completedTaskThunk";
import { fetchPendingTask } from "../features/myTask/pendingTaskThunk";
import { useAppDispatch } from "../app/hooks";

type useTaskReturn = {
  formik: FormikProps<CreateTaskPayload>;
  loading: boolean;
  openSnackbar: SnackbarState;
  onCloseSnackbar: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  onGetDetailTask: (id: string) => void;
  onDeleteTask: (page: string, id: string) => void;
  setDetailTask: (value: CreateTaskPayload | null) => void;
  onUpdateStatus: (page: string, id: string, checked: boolean) => void;
};

const useTask = (): useTaskReturn => {
  // router
  const navigate = useNavigate();
  const { id } = useParams();
  // redux
  const dispatch = useAppDispatch();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarState>({
    open: false,
    color: "success",
    message: "",
  });
  const [detailTask, setDetailTask] = useState<CreateTaskPayload | null>(null);
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
    enableReinitialize: true,
    initialValues: {
      title: detailTask?.title ?? "",
      description: detailTask?.description ?? "",
      due_date:
        detailTask?.due_date ?? dayjs().startOf("day").format("YYYY-MM-DD"), // ✅ STRING
      priority: detailTask?.priority ?? "",
    },
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let response;
        const payload = {
          title: values.title,
          description: values.description,
          due_date: values.due_date,
          priority: values.priority,
        };
        if (!id) {
          response = await createTask(payload);
        } else {
          response = await updateTask(id, payload);
        }
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
          message:
            error?.response?.data?.message ||
            (id ? "Update task failed" : "Create task failed"),
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const onGetDetailTask = (id: string): void => {
    navigate(`/task/update/${id}`);
  };

  const onDeleteTask = async (page: string, id: string) => {
    try {
      setLoading(true);
      const response = await deleteTask(id);
      setOpenSnackbar({
        open: true,
        color: "success",
        message: response.message,
      });
      if (page === "all") {
        dispatch(fetchAllTask({ page: 1, limit: 5 }));
      } else if (page === "completed") {
        dispatch(fetchCompletedTask({ page: 1, limit: 5 }));
      } else {
        dispatch(fetchPendingTask({ page: 1, limit: 5 }));
      }
    } catch (error: any) {
      setOpenSnackbar({
        open: true,
        color: "error",
        message: error?.response?.data?.message || "Create task failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const onUpdateStatus = async (page: string, id: string, checked: boolean) => {
    try {
      setLoading(true);
      const payload = { is_completed: checked };
      const response = await updateStatusTask(id, payload);
      setOpenSnackbar({
        open: true,
        color: "success",
        message: response.message,
      });
      if (page === "all") {
        dispatch(fetchAllTask({ page: 1, limit: 5 }));
      } else if (page === "completed") {
        dispatch(fetchCompletedTask({ page: 1, limit: 5 }));
      } else {
        dispatch(fetchPendingTask({ page: 1, limit: 5 }));
      }
    } catch (error: any) {
      setOpenSnackbar({
        open: true,
        color: "error",
        message: error?.response?.data?.message || "Update status failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formik,
    loading,
    openSnackbar,
    onCloseSnackbar,
    onGetDetailTask,
    setDetailTask,
    onDeleteTask,
    onUpdateStatus,
  };
};

export default useTask;
