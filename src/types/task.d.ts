import { Dayjs } from "dayjs";

export type CreateTaskPayload = {
  title: string;
  description: string;
  due_date: string;
  priority: string;
};

export type CreateTaskResponse = {
  message: string; // note : untuk ini cari tahu apa hubungannya dengan type snackbar karna pas di ubah jadi optional type error
};

export interface ITaskDetailResponse {
  data: CreateTaskPayload;
}

export type DeleteTaskResponse = {
  message: string;
};
