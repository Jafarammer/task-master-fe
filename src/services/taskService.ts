import api from "../app/api";
import { CreateTaskPayload, CreateTaskResponse } from "../types/task";

export const createTask = async (
  payload: CreateTaskPayload,
): Promise<CreateTaskResponse> => {
  const res = await api.post<CreateTaskResponse>("/task", payload);
  return res.data;
};

export const updateTask = async (
  id: string,
  payload: CreateTaskPayload,
): Promise<CreateTaskResponse> => {
  const res = await api.patch<CreateTaskResponse>(`/task/${id}`, payload);
  return res.data;
};
