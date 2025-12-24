import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { setToken } from "@task-master/core-fe";

const useAuthToken = () => {
  const [cookies] = useCookies(["token"]);
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const token = cookies.token;
    if (token) {
      setToken(token);
    }
  }, [cookies]);
};

export default useAuthToken;
