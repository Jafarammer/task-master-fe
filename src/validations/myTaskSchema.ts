import * as Yup from "yup";

export const myTaskSchema = Yup.object({
  title: Yup.string().required("Title is required field!"),
  description: Yup.string().required("Description is required field!"),
  due_date: Yup.string()
    .required("Date is required field!")
    .test("not-past", "Date must be today or later", (value) => {
      if (!value) return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selected = new Date(value);
      selected.setHours(0, 0, 0, 0);

      return selected >= today;
    }),

  priority: Yup.string().required("Priority is required field!"),
});
