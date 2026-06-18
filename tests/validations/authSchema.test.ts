import { describe, it, expect } from "vitest";
import { validations } from "../../src/validations";

describe("LOGIN VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      email: "jhone@example.com",
      password: "@Jhonedoe123",
    };

    const result = await validations.login.validate(data);

    expect(result).toEqual(data);
  });

  it("should fail when email is empty", async () => {
    const data = {
      email: "",
      password: "@Jhonedoe123",
    };

    await expect(validations.login.validate(data)).rejects.toThrow(
      "Email is required field!",
    );
  });

  it("should fail when email format is invalid", async () => {
    const data = {
      email: "jhone123",
      password: "@Jhonedoe123",
    };

    await expect(validations.login.validate(data)).rejects.toThrow(
      "Invalid email format",
    );
  });

  it("should fail when password is empty", async () => {
    const data = {
      email: "jhone@example.com",
      password: "",
    };

    await expect(validations.login.validate(data)).rejects.toThrow(
      "Password is required field!",
    );
  });
});

describe("REGISTER VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe123",
    };

    const result = await validations.register.validate(data);
    expect(result).toEqual(data);
  });

  it("should fail when full name is empty", async () => {
    const data = {
      fullName: "",
      email: "jhone@example.com",
      password: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Full name is required field!",
    );
  });

  it("should fail when email is empty", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "",
      password: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Email is required field!",
    );
  });

  it("should fail when email format is invalid", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "not-an-email",
      password: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Invalid email format",
    );
  });

  it("should fail when password is empty", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "",
      confirmPassword: "@Jhonedoe123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Password is required field!",
    );
  });

  it("should fail when password is less than 8 characters", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@Jho1",
      confirmPassword: "@Jho1",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Password must be at least 8 characters",
    );
  });

  it("should fail when password has no uppercase letter", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@jhonedoe123",
      confirmPassword: "@jhonedoe123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "At least 1 uppercase letter",
    );
  });

  it("should fail when password has no lowercase letter", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@JHONEDOE123",
      confirmPassword: "@JHONEDOE123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "At least 1 lowercase letter",
    );
  });

  it("should fail when password has no number", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@Jhonedoe",
      confirmPassword: "@Jhonedoe",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "At least 1 number",
    );
  });

  it("should fail when password has no special character", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "Jhonedoe123",
      confirmPassword: "Jhonedoe123",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "At least 1 special character",
    );
  });

  it("should fail when confirm password is empty", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@Jhonedoe123",
      confirmPassword: "",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Confirm password is required field!",
    );
  });

  it("should fail when passwords do not match", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
      password: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe321",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Passwords must match",
    );
  });
});

describe("FORGOT PASSWORD VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      email: "jhone@example.com",
    };

    const result = await validations.forgotPassword.validate(data);
    expect(result).toEqual(data);
  });

  it("should fail when email is empty", async () => {
    const data = {
      email: "",
    };

    await expect(validations.forgotPassword.validate(data)).rejects.toThrow(
      "Email is required field!",
    );
  });

  it("should fail when email format is invalid", async () => {
    const data = {
      email: "invalid-email",
    };

    await expect(validations.forgotPassword.validate(data)).rejects.toThrow(
      "Invalid email format",
    );
  });
});

describe("RESET PASSWORD VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      newPassword: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe123",
    };

    const result = await validations.resetPassword.validate(data);
    expect(result).toEqual(data);
  });

  it("should fail when new password is empty", async () => {
    const data = {
      newPassword: "",
      confirmPassword: "@Jhonedoe123",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "New Password is required field!",
    );
  });

  it("should fail when new password is less than 8 characters", async () => {
    const data = {
      newPassword: "@Jho1",
      confirmPassword: "@Jho1",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "Password must be at least 8 characters",
    );
  });

  it("should fail when new password has no uppercase letter", async () => {
    const data = {
      newPassword: "@jhonedoe123",
      confirmPassword: "@jhonedoe123",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "At least 1 uppercase letter",
    );
  });

  it("should fail when new password has no lowercase letter", async () => {
    const data = {
      newPassword: "@JHONEDOE123",
      confirmPassword: "@JHONEDOE123",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "At least 1 lowercase letter",
    );
  });

  it("should fail when new password has no number", async () => {
    const data = {
      newPassword: "@Jhonedoe",
      confirmPassword: "@Jhonedoe",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "At least 1 number",
    );
  });

  it("should fail when new password has no special character", async () => {
    const data = {
      newPassword: "Jhonedoe123",
      confirmPassword: "Jhonedoe123",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "At least 1 special character",
    );
  });

  it("should fail when confirm password is empty", async () => {
    const data = {
      newPassword: "@Jhonedoe123",
      confirmPassword: "",
    };

    await expect(validations.register.validate(data)).rejects.toThrow(
      "Confirm password is required field!",
    );
  });

  it("should fail when new passwords do not match", async () => {
    const data = {
      newPassword: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe321",
    };

    await expect(validations.resetPassword.validate(data)).rejects.toThrow(
      "Passwords must match",
    );
  });
});
