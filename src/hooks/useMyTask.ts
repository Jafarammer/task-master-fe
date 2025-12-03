import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchAllTask } from "../features/myTask/allTaskThunk";
import { fetchCompletedTask } from "../features/myTask/completedTaskThunk";
import { fetchPendingTask } from "../features/myTask/pendingTaskThunk";
import { deleteTask, updateStatusTask } from "../services/taskService";
import useSnackbarAlert from "./useSnackbarAlert";
import { ParamsFilter } from "../helpers/filterParamsHelper";

type useMyTaskReturn = {
  onGetDetailTask: (id: string, params: ParamsFilter) => void;
  onGetEditTask: (id: string, params: ParamsFilter) => void;
  onDeleteTask: (tab: string, id: string) => void;
  onUpdateStatus: (tab: string, id: string, checked: boolean) => void;
};

const useMyTask = (): useMyTaskReturn => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  // hooks
  const notify = useSnackbarAlert();
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
  };
};

export default useMyTask;
