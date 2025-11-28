import api from "../api/axios";
import {
  CreateTaskPayload,
  CreateTaskResponse,
  ITaskDetailResponse,
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
  console.log("ini yak", res);

  return res.data;
};
