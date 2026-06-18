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
    .required("New Password is required field!")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "At least 1 uppercase letter")
    .matches(/[a-z]/, "At least 1 lowercase letter")
    .matches(/[0-9]/, "At least 1 number")
    .matches(/[@$!%*?&]/, "At least 1 special character"),
  confirmPassword: Yup.string()
    .required("Confirm password is required field!")
    .test("passwords-match", "Passwords must match", function (value) {
      const { newPassword } = this.parent;
      if (!value) return true;
      if (!newPassword) return true;

      return value === newPassword;
    }),
});
