import * as Yup from "yup";

export const myTaskSchema = Yup.object({
  title: Yup.string().required("Title is required field!"),
  description: Yup.string().required("Description is required field!"),
  dueDate: Yup.string().required("Date is required field!"),
  priority: Yup.string().required("Priority is required field!"),
});
