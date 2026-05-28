export interface IMyTaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
}

export interface IMyTaskParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  order?: "asc" | "desc";
  search?: string;
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

export type UpdateStatusPaylod = {
  is_completed: boolean;
};

// new

export type MyTaskResponse = {
  message: string;
};

export type MyTaskPayload = {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  is_completed?: boolean;
};

export type TaskDetailResponse = {
  data: MyTaskPayload;
};
