import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

type UseLogoutReturn = {
  onLogout: () => void;
};

const useLogout = (): UseLogoutReturn => {
  const navigate = useNavigate();

  const onLogout = (): void => {
    removeToken();
    navigate("/login");
  };
  return {
    onLogout,
  };
};

export default useLogout;
