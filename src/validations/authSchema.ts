import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required field!"),
  password: Yup.string().required("Password is required field!"),
});

export const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required field!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required field!"),

  password: Yup.string()
    .required("Password is required field!")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "At least 1 uppercase letter")
    .matches(/[a-z]/, "At least 1 lowercase letter")
    .matches(/[0-9]/, "At least 1 number")
    .matches(/[@$!%*?&]/, "At least 1 special character"),
  confirmPassword: Yup.string()
    .required("Confirm password is required field!")
    .test("passwords-match", "Passwords must match", function (value) {
      const { password } = this.parent;
      if (!value) return true;
      if (!password) return true;

      return value === password;
    }),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required field!")
    .email("Invalid email format"),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "At least 1 uppercase letter")
    .matches(/[a-z]/, "At least 1 lowercase letter")
    .matches(/[0-9]/, "At least 1 number")
    .matches(/[@$!%*?&]/, "At least 1 special character")
    .required("New Password is required field!"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required field!"),
});
