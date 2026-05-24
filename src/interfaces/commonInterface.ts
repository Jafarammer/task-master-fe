export interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IApiResponse<T = unknown> {
  data?: T;
  metaData?: IMetaData;
  message: string;
}

export interface IApiErrorResponse {
  message: string;
}

export interface IApiParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  query?: string;
}
