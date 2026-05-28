import { useAppDispatch } from "../app/hooks";
import { showSnackbar } from "../features/components/snackbarSlice";
import { TSnackbarState } from "../types/common";

type useSnackbarAlertReturn = (
  message: string,
  color?: TSnackbarState["color"],
) => void;

const useSnackbarAlert = (): useSnackbarAlertReturn => {
  const dispatch = useAppDispatch();

  return (message: string, color?: TSnackbarState["color"]) => {
    dispatch(showSnackbar({ message, color }));
  };
};

export default useSnackbarAlert;
