import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import useSnackbarAlert from "./useSnackbarAlert";
import { ParamsFilter } from "../helpers/filterParamsHelper";
import { updateStatusTask, deleteTask } from "../services/myTaskService";
import {
  fetchAllTask,
  fetchCompletedTask,
  fetchPendingTask,
} from "../features/myTask/myTaskThunk";
import { MyTaskPayload } from "../types/myTask";
import { validations } from "../validations";
import { createTask, updateTask } from "../services/myTaskService";

type useMyTaskReturn = {
  onGetDetailTask: (id: string, params: ParamsFilter) => void;
  onGetEditTask: (id: string, params: ParamsFilter) => void;
  onDeleteTask: (tab: string, id: string) => void;
  onUpdateStatus: (tab: string, id: string, checked: boolean) => void;
  formik: FormikProps<MyTaskPayload>;
  setDetailTask: (value: MyTaskPayload | null) => void;
  loading: boolean;
};

const useMyTask = (): useMyTaskReturn => {
  // router
  const navigate = useNavigate();
  const { id } = useParams();
  // redux
  const dispatch = useAppDispatch();
  // hooks
  const notify = useSnackbarAlert();
  // useState
  // useState
  const [loading, setLoading] = useState<boolean>(false);
  const [detailTask, setDetailTask] = useState<MyTaskPayload | null>(null);
  // formik
  const formik = useFormik<MyTaskPayload>({
    enableReinitialize: true,
    initialValues: {
      title: detailTask?.title ?? "",
      description: detailTask?.description ?? "",
      due_date:
        detailTask?.due_date ?? dayjs().startOf("day").format("YYYY-MM-DD"), // ✅ STRING
      priority: detailTask?.priority ?? "",
    },
    validationSchema: validations.myTask,
    onSubmit: async (values): Promise<void> => {
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
        notify(response.message, "success");
        navigate("/my-task?filter=all");
      } catch (error: any) {
        notify(
          error?.response?.data?.message ||
            (id ? "Update task failed" : "Create task failed"),
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
  });
  // function event
  const onGetDetailTask = (id: string, params: ParamsFilter): void => {
    navigate(`/task/detail/${id}?filter=${params}`);
  };
  const onGetEditTask = (id: string, params: ParamsFilter): void => {
    navigate(`/task/update/${id}?filter=${params}`);
  };
  const onUpdateStatus = async (tab: string, id: string, checked: boolean) => {
    try {
      const payload = { is_completed: checked };
      const response = await updateStatusTask(id, payload);
      notify(response.message, "success");
      if (tab === "all") {
        dispatch(fetchAllTask({ page: 1, limit: 5 }));
      } else if (tab === "completed") {
        dispatch(fetchCompletedTask({ page: 1, limit: 5 }));
      } else {
        dispatch(fetchPendingTask({ page: 1, limit: 5 }));
      }
    } catch (error: any) {
      notify(error?.response?.data?.message || "Update status failed", "error");
    }
  };
  const onDeleteTask = async (tab: string, id: string) => {
    try {
      const response = await deleteTask(id);
      notify(response.message, "success");

      if (tab === "all") {
        dispatch(fetchAllTask({ page: 1, limit: 5 }));
      } else if (tab === "completed") {
        dispatch(fetchCompletedTask({ page: 1, limit: 5 }));
      } else {
        dispatch(fetchPendingTask({ page: 1, limit: 5 }));
      }
    } catch (error: any) {
      notify(error?.response?.data?.message || "Delete task failed", "error");
    }
  };

  return {
    onGetDetailTask,
    onUpdateStatus,
    onDeleteTask,
    onGetEditTask,
    formik,
    setDetailTask,
    loading,
  };
};

export default useMyTask;
