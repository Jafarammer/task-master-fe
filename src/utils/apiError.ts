import axios from "axios";
import type {
  ApiErrorResponse,
  ParsedApiError,
} from "../interfaces/commonInterface";

export const parseApiError = (
  error: unknown,
  fallbackMessage = "Something went wrong",
): ParsedApiError => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      status: undefined,
      message: error instanceof Error ? error.message : fallbackMessage,
    };
  }

  console.log("this", error);

  return {
    status: error.response?.status,
    message: error.response?.data?.message ?? error.message ?? fallbackMessage,
  };
};
