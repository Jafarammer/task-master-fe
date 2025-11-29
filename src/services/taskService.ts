import api from "../api/axios";
import {
  CreateTaskPayload,
  CreateTaskResponse,
  ITaskDetailResponse,
  DeleteTaskResponse,
} from "../types/task";

export const createTask = async (
  payload: CreateTaskPayload
): Promise<CreateTaskResponse> => {
  const res = await api.post<CreateTaskResponse>("/task", payload);
  return res.data;
};

export const fetchTaskDetail = async (
  id: string
): Promise<ITaskDetailResponse> => {
  const res = await api.get(`/task/${id}`);

  return res.data;
};

export const deleteTask = async (id: string): Promise<DeleteTaskResponse> => {
  const res = await api.delete(`/task/hard/${id}`);
  return res.data;
};
