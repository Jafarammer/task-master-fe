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
  metaData?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface IMyTaskPayload {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

export interface IUpdateStatusPayload {
  isCompleted: boolean;
}

export interface IMyTaskDetailResponse {
  data: IMyTaskData;
}
