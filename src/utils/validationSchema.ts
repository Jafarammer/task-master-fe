import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required field!"),
  lastName: Yup.string().required("Last name is required field!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required field!"),
  password: Yup.string()
    .min(6, "Password min 6 characters")
    .required("Password is required field!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required field!"),
});
