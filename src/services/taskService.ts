import api from "../api/axios";
import { CreateTaskPayload, CreateTaskResponse } from "../types/task";

export const createTask = async (
  payload: CreateTaskPayload
): Promise<CreateTaskResponse> => {
  const res = await api.post<CreateTaskResponse>("/task", payload);
  return res.data;
};
