import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../utils/auth";
import { useAppDispatch } from "../app/hooks";
import { logOutUser } from "../services/authService";
import { logOutMyTask } from "../features/myTask/myTaskSlice";
import { logoutProfile } from "../features/profile/profileSlice";
import { logoutTaskTrash } from "../features/trash/trashSlice";
import useSnackbarAlert from "./useSnackbarAlert";
import { persistor } from "../app/store";
import { parseApiError } from "../utils/apiError";

type UseLogoutReturn = {
  onLogout: () => void;
};

const useLogout = (): UseLogoutReturn => {
  // router
  const navigate = useNavigate();
  // redux
  const dispatch = useAppDispatch();
  // hooks
  const notify = useSnackbarAlert();
  // function
  const onLogout = async (): Promise<void> => {
    try {
      const response = await logOutUser();
      notify(response.message, "success");
    } catch (error: any) {
      const { message } = parseApiError(error);
      notify(message, "error");
    } finally {
      removeAccessToken();
      dispatch(logOutMyTask());
      dispatch(logoutProfile());
      dispatch(logoutTaskTrash());
      await persistor.purge();
      navigate("/login", {
        replace: true,
      });
    }
  };
  return {
    onLogout,
  };
};

export default useLogout;
