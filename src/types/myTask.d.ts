export interface IMyTaskData {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  due_date: string;
  priority: "low" | "medium" | "high";
  is_completed: boolean;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
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
  meta_data: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
