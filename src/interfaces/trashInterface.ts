export interface ITrashData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
}

export interface ITrashResponse {
  data: ITrashData[];
  metaData?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
