import api from "../app/api";
import {
  UpdateStatusPaylod,
  MyTaskPayload,
  MyTaskResponse,
  TaskDetailResponse,
} from "../types/myTask";

export const createTask = async (
  payload: MyTaskPayload,
): Promise<MyTaskResponse> => {
  const res = await api.post<MyTaskResponse>("/task", payload);
  return res.data;
};

export const updateTask = async (
  id: string,
  payload: MyTaskPayload,
): Promise<MyTaskResponse> => {
  const res = await api.patch<MyTaskResponse>(`/task/${id}`, payload);
  return res.data;
};

export const updateStatusTask = async (
  id: string,
  payload: UpdateStatusPaylod,
): Promise<MyTaskResponse> => {
  const res = await api.patch<MyTaskResponse>(`/task/status/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id: string): Promise<MyTaskResponse> => {
  const res = await api.delete<MyTaskResponse>(`/task/hard/${id}`);
  return res.data;
};

export const fetchDetailTask = async (
  id: string,
): Promise<TaskDetailResponse> => {
  const res = await api.get<TaskDetailResponse>(`/task/detail/${id}`);
  return res.data;
};
