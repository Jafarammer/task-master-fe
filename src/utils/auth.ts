import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("token");
export const removeToken = (): void => cookies.remove("token");
