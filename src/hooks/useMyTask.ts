import { useState } from "react";
import { useFormik, FormikProps } from "formik";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import useSnackbarAlert from "./useSnackbarAlert";
import { ParamsFilter } from "../helpers/filterParamsHelper";
import {
  fetchAllTask,
  fetchCompletedTask,
  fetchPendingTask,
} from "../features/myTask/myTaskThunk";
import { IMyTaskPayload, IMyTaskData } from "../interfaces/myTaskInterface";
import { validations } from "../validations";
import {
  createTask,
  updateTask,
  updateStatusTask,
  softDeleteTask,
} from "../services/myTaskService";

type useMyTaskReturn = {
  onGetDetailTask: (id: string, params: ParamsFilter) => void;
  onGetEditTask: (id: string, params: ParamsFilter) => void;
  onSoftDeleteTask: (tab: string, id: string) => void;
  onUpdateStatus: (tab: string, id: string, checked: boolean) => void;
  formik: FormikProps<IMyTaskPayload>;
  setDetailTask: (value: IMyTaskData | null) => void;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [detailTask, setDetailTask] = useState<IMyTaskData | null>(null);
  // formik
  const formik = useFormik<IMyTaskPayload>({
    enableReinitialize: true,
    initialValues: {
      title: detailTask?.title ?? "",
      description: detailTask?.description ?? "",
      dueDate:
        detailTask?.dueDate ?? dayjs().startOf("day").format("YYYY-MM-DD"), // ✅ STRING
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
          dueDate: values.dueDate,
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
        notify(id ? "Update task failed" : "Create task failed", "error");
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
      const payload = { isCompleted: checked };
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
      notify("Update status failed", "error");
    }
  };

  const onSoftDeleteTask = async (tab: string, id: string) => {
    try {
      const response = await softDeleteTask(id);
      notify(response.message, "success");
      if (tab === "all") {
        dispatch(fetchAllTask({ page: 1, limit: 5 }));
      } else if (tab === "completed") {
        dispatch(fetchCompletedTask({ page: 1, limit: 5 }));
      } else {
        dispatch(fetchPendingTask({ page: 1, limit: 5 }));
      }
    } catch (error: any) {
      notify("Delete task failed", "error");
    }
  };

  return {
    onGetDetailTask,
    onUpdateStatus,
    onGetEditTask,
    formik,
    setDetailTask,
    loading,
    onSoftDeleteTask,
  };
};

export default useMyTask;
