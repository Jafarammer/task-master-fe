import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  hardDeleteTask,
  restoreTask,
  hardDeleteTaskMany,
} from "../services/trashService";
import { fetchTrash, fetchTrashStatistics } from "../features/trash/trashthunk";
import useSnackbarAlert from "./useSnackbarAlert";
import { TLoadingType, TPagination } from "../types/common";
import { parseApiError } from "../utils/apiError";

type useTrashReturn = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  pagination: TPagination;
  setPagination: Dispatch<SetStateAction<TPagination>>;
  loading: TLoadingType;
  onHardDeleteSingle: (id: string) => void;
  onRestoreTask: (id: string) => void;
  onHardDeleteMany: () => void;
};

const useTrash = (): useTrashReturn => {
  // redux
  const dispatch = useAppDispatch();
  // hooks
  const notify = useSnackbarAlert();
  // useState
  const [loading, setLoading] = useState<TLoadingType>({
    context: "",
    open: false,
  });
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 5,
  });
  const [search, setSearch] = useState<string>("");
  // function event
  const onHardDeleteSingle = async (id: string) => {
    try {
      setLoading({ context: "singleDelete", open: true });
      const response = await hardDeleteTask(id);
      notify(response.message, "success");
      dispatch(
        fetchTrash({
          page: pagination.page,
          limit: pagination.limit,
          query: search,
        }),
      );
      dispatch(fetchTrashStatistics());
    } catch (error: any) {
      const { message } = parseApiError(error);
      notify(message, "error");
    } finally {
      setLoading({ context: "", open: false });
    }
  };

  const onHardDeleteMany = async () => {
    try {
      setLoading({ context: "singleDelete", open: true });
      const response = await hardDeleteTaskMany();
      notify(response.message, "success");
      dispatch(
        fetchTrash({
          page: pagination.page,
          limit: pagination.limit,
          query: search,
        }),
      );
      dispatch(fetchTrashStatistics());
    } catch (error: any) {
      const { message } = parseApiError(error);
      notify(message, "error");
    } finally {
      setLoading({ context: "", open: false });
    }
  };

  const onRestoreTask = async (id: string) => {
    try {
      setLoading({ context: "restore", open: true });
      const response = await restoreTask(id);
      notify(response.message, "success");
      dispatch(
        fetchTrash({
          page: pagination.page,
          limit: pagination.limit,
          query: search,
        }),
      );
      dispatch(fetchTrashStatistics());
    } catch (error: any) {
      const { message } = parseApiError(error);
      notify(message, "error");
    } finally {
      setLoading({ context: "", open: false });
    }
  };

  // useEffect
  useEffect(() => {
    dispatch(
      fetchTrash({
        page: pagination.page,
        limit: pagination.limit,
        query: search,
      }),
    );
    dispatch(fetchTrashStatistics());
  }, [dispatch, pagination, search]);

  return {
    search,
    setSearch,
    pagination,
    setPagination,
    loading,
    onHardDeleteSingle,
    onRestoreTask,
    onHardDeleteMany,
  };
};

export default useTrash;
