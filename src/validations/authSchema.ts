import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required field!"),
  password: Yup.string()
    .min(6, "Password min 6 characters")
    .required("Password is required field!"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required field!"),

  lastName: Yup.string().required("Last name is required field!"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required field!"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "At least 1 uppercase letter")
    .matches(/[a-z]/, "At least 1 lowercase letter")
    .matches(/[0-9]/, "At least 1 number")
    .matches(/[@$!%*?&]/, "At least 1 special character")
    .required("Password is required field!"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required field!"),
});
