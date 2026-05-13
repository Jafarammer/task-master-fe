import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full Name is required!"),

  email: Yup.string()
    .trim()
    .email("Invalid email format!")
    .required("Email is required!"),
});
