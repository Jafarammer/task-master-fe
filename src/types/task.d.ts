import { Dayjs } from "dayjs";

export interface IFormValuesTask {
  title: string;
  description: string;
  dueDate: Dayjs | null;
  priority: string;
}
