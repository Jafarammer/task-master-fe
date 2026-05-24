export type TPriority = "low" | "medium" | "high";

export interface IMyTaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TPriority;
  isCompleted: boolean;
}
