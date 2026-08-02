import { Cookies } from "react-cookie";

const cookies = new Cookies();
const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export const getAccessToken = (): string | undefined => {
  return cookies.get(ACCESS_TOKEN_COOKIE_NAME);
};

export const setAccessToken = (accessToken: string): void => {
  cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    path: "/",
    sameSite: "lax",
    maxAge: 15 * 60,
  });
};

export const removeAccessToken = (): void => {
  cookies.remove(ACCESS_TOKEN_COOKIE_NAME, {
    path: "/",
  });
};
