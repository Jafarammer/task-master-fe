import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useAppDispatch } from "../app/hooks";
import { logOutMyTask } from "../features/myTask/myTaskSlice";

type UseLogoutReturn = {
  onLogout: () => void;
};

const useLogout = (): UseLogoutReturn => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = (): void => {
    dispatch(logOutMyTask());
    removeToken();
    navigate("/login");
  };
  return {
    onLogout,
  };
};

export default useLogout;
