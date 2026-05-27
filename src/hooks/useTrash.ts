import { useState, Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../app/hooks";
import { hardDeleteTask } from "../services/trashService";
import { fetchTrash, fetchTrashStatistics } from "../features/trash/trashthunk";
import useSnackbarAlert from "./useSnackbarAlert";
import { TLoadingType, TPagination } from "../types/common";

type useTrashReturn = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  pagination: TPagination;
  setPagination: Dispatch<SetStateAction<TPagination>>;
  loading: TLoadingType;
  onHardDeleteSingle: (id: string) => void;
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
      notify("Delete task failed", "error");
    } finally {
      setLoading({ context: "", open: false });
    }
  };

  return {
    search,
    setSearch,
    pagination,
    setPagination,
    loading,
    onHardDeleteSingle,
  };
};

export default useTrash;
