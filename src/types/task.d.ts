import { Dayjs } from "dayjs";

export type TaskFormValues = {
  title: string;
  description: string;
  dueDate: Dayjs | null;
  priority: string;
};
