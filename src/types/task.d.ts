export type CreateTaskPayload = {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  is_completed?: boolean;
};

export type CreateTaskResponse = {
  message: string;
};

export type TaskDetailResponse = {
  data: CreateTaskPayload;
};
