export interface ITrashData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
}

export interface ITrashDataStatistics {
  totalItems: number;
  trashItems: number;
  activeItems: number;
  usedStorage: string;
  maxStorage: string;
  percentage?: number;
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

export interface ITrashStatisticsResponse {
  data: ITrashDataStatistics;
  message: string;
}
