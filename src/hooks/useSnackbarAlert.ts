import { useAppDispatch } from "../app/hooks";
import { showSnackbar } from "../app/ui/snackbarSlice";
import { SnackbarState } from "../types/global";

type useSnackbarAlertReturn = (
  message: string,
  color?: SnackbarState["color"]
) => void;

const useSnackbarAlert = (): useSnackbarAlertReturn => {
  const dispatch = useAppDispatch();

  return (message: string, color?: SnackbarState["color"]) => {
    dispatch(showSnackbar({ message, color }));
  };
};

export default useSnackbarAlert;
