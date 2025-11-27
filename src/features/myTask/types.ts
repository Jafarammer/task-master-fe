export interface IAllTaskData {
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

export interface IAllTaskParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  order?: "asc" | "desc";
}

export interface IAllTaskResponse {
  data: IAllTaskData[];
  meta_data: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
