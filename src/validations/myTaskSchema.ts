import * as Yup from "yup";

export const myTaskSchema = Yup.object({
  title: Yup.string().required("Title is required field!"),
  description: Yup.string().required("Description is required field!"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  priority: Yup.string().required("Priority is required field!"),
});
