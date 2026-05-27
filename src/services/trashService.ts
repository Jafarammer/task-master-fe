import api from "../app/api";

export const hardDeleteTask = async (
  id: string,
): Promise<{ message: string }> => {
  const res = await api.delete(`/task/hard/${id}`);
  return res.data;
};
