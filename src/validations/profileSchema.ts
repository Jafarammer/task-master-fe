import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full Name is required!"),
  email: Yup.string()
    .trim()
    .required("Email is required!")
    .email("Invalid email format!"),
});

export const updateProfilePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required!"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "At least 1 uppercase letter")
    .matches(/[a-z]/, "At least 1 lowercase letter")
    .matches(/[0-9]/, "At least 1 number")
    .matches(/[@$!%*?&]/, "At least 1 special character")
    .required("New Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required!"),
});
