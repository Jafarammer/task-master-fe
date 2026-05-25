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
