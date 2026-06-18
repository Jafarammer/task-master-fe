import * as Yup from "yup";

export const myTaskSchema = Yup.object({
  title: Yup.string().required("Title is required field!"),
  description: Yup.string().required("Description is required field!"),
  startDate: Yup.string().required("Start date is required field!"),
  endDate: Yup.string().required("End date is required field!"),
  priority: Yup.string()
    .required("Priority is required field!")
    .oneOf(
      ["low", "medium", "high"],
      "Priority must be one of, low, medium, high",
    ),
}).test("date-range", "", function (value) {
  if (!value?.startDate || !value?.endDate) {
    return true;
  }

  if (new Date(value.endDate) < new Date(value.startDate)) {
    return this.createError({
      path: "endDate",
      message: "End date must be greater than start date",
    });
  }

  return true;
});
