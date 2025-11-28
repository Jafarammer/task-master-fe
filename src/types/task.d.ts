import { Dayjs } from "dayjs";

export type CreateTaskPayload = {
  title: string;
  description: string;
  due_date: string;
  priority: string;
};

export type CreateTaskResponse = {
  message: string;
};
