export interface IMyTaskData {
  id: string;
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
  isExpired: boolean;
}
export interface IMyTaskMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IMyTaskResponse {
  data: IMyTaskData[];
  metaData: IMyTaskMetaData;
}
export interface IMyTaskPayload {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: string;
}

export interface IUpdateStatusPayload {
  isCompleted: boolean;
}

export interface IMyTaskDetailResponse {
  data: IMyTaskData;
}
