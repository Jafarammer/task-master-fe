import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarState } from "../types/global";
import dayjs from "dayjs";
import useSnackbarAlert from "./useSnackbarAlert";
import {
  myTaskService,
  TMyTaskPayload,
  validations,
} from "@task-master/core-fe";

type useTaskReturn = {
  formik: FormikProps<TMyTaskPayload>;
  loading: boolean;
  setDetailTask: (value: TMyTaskPayload | null) => void;
};

const useTask = (): useTaskReturn => {
  // router
  const navigate = useNavigate();
  const { id } = useParams();
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarState>({
    open: false,
    color: "success",
    message: "",
  });
  // hooks
  const notify = useSnackbarAlert();
  const [detailTask, setDetailTask] = useState<TMyTaskPayload | null>(null);
  // function event
  const formik = useFormik<TMyTaskPayload>({
    enableReinitialize: true,
    initialValues: {
      title: detailTask?.title ?? "",
      description: detailTask?.description ?? "",
      due_date:
        detailTask?.due_date ?? dayjs().startOf("day").format("YYYY-MM-DD"), // ✅ STRING
      priority: detailTask?.priority ?? "",
    },
    validationSchema: validations.task,
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
          response = await myTaskService.create(payload);
        } else {
          response = await myTaskService.update(id, payload);
        }
        notify(response.message, "success");
        navigate("/my-task?filter=all"); // note : karna ini create langsung define all saja routingnya
      } catch (error: any) {
        notify(
          error?.response?.data?.message ||
            (id ? "Update task failed" : "Create task failed"),
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
    setDetailTask,
  };
};

export default useTask;
