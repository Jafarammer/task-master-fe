import api from "../app/api";

export const hardDeleteTask = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.delete(`/task/hard/${id}`);
  return res.data;
};

export const restoreTask = async (id: string): Promise<{ message: string }> => {
  const res = await api.patch(`task/restore/${id}`);
  return res.data;
};

export const hardDeleteTaskMany = async (): Promise<{ message: string }> => {
  const res = await api.delete("task/trash/all");
  return res.data;
};
