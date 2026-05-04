import api from "../app/api";
import {
  UpdateStatusPaylod,
  UpdateStatusResponse,
  DeleteTaskResponse,
} from "../types/myTask";

export const updateStatusTask = async (
  id: string,
  payload: UpdateStatusPaylod,
): Promise<UpdateStatusResponse> => {
  const res = await api.patch<UpdateStatusResponse>(
    `/task/status/${id}`,
    payload,
  );
  return res.data;
};

export const deleteTask = async (id: string): Promise<DeleteTaskResponse> => {
  const res = await api.delete<DeleteTaskResponse>(`/task/hard/${id}`);
  return res.data;
};
