export interface IMyTaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
}

export interface IMyTaskResponse {
  data: IMyTaskData[];
  metaData: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
