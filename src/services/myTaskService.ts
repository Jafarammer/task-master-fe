import api from "../app/api";
import {
  IMyTaskPayload,
  IMyTaskDetailResponse,
  IUpdateStatusPayload,
} from "../interfaces/myTaskInterface";

export const createTask = async (
  payload: IMyTaskPayload,
): Promise<{ message: string }> => {
  const res = await api.post("/task", payload);
  return res.data;
};

export const updateTask = async (
  id: string,
  payload: IMyTaskPayload,
): Promise<{ message: string }> => {
  const res = await api.put(`/task/${id}`, payload);
  return res.data;
};

export const updateStatusTask = async (
  id: string,
  payload: IUpdateStatusPayload,
): Promise<{ message: string }> => {
  const res = await api.patch(`/task/status/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete(`/task/soft/${id}`);
  return res.data;
};

export const fetchDetailTask = async (
  id: string,
): Promise<IMyTaskDetailResponse> => {
  const res = await api.get(`/task/detail/${id}`);
  return res.data;
};

export const softDeleteTask = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.delete(`/task/soft/${id}`);
  return res.data;
};
