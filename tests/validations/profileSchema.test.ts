import { describe, it, expect } from "vitest";
import { validations } from "../../src/validations";

describe("UPDATE PROFILE VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
    };

    const result = await validations.updateProfile.validate(data);
    expect(result).toEqual(data);
  });

  it("should fail when full name is empty", async () => {
    const data = {
      fullName: "",
      email: "jhone@example.com",
    };

    await expect(validations.updateProfile.validate(data)).rejects.toThrow(
      "Full Name is required!",
    );
  });

  it("should fail when email is empty", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "",
    };

    await expect(validations.updateProfile.validate(data)).rejects.toThrow(
      "Email is required!",
    );
  });

  it("should fail when email format is invalid", async () => {
    const data = {
      fullName: "Jhone Doe",
      email: "invalid-email",
    };

    await expect(validations.updateProfile.validate(data)).rejects.toThrow(
      "Invalid email format!",
    );
  });
});

describe("UPDATE PROFILE PASSWORD VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@Jhonedoe321",
      confirmPassword: "@Jhonedoe321",
    };

    const result = await validations.updateProfilePassword.validate(data);
    expect(result).toEqual(data);
  });

  it("should fail when current password is empty", async () => {
    const data = {
      currentPassword: "",
      newPassword: "@Jhonedoe321",
      confirmPassword: "@Jhonedoe321",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("Current Password is required!");
  });

  it("should fail when new password is empty", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "",
      confirmPassword: "@Jhonedoe123",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("New Password is required field!");
  });

  it("should fail when new password is less than 8 characters", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@Jho1",
      confirmPassword: "@Jho1",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("Password must be at least 8 characters");
  });

  it("should fail when new password has no uppercase letter", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@jhonedoe123",
      confirmPassword: "@jhonedoe123",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("At least 1 uppercase letter");
  });

  it("should fail when new password has no lowercase letter", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@JHONEDOE123",
      confirmPassword: "@JHONEDOE123",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("At least 1 lowercase letter");
  });

  it("should fail when new password has no number", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@Jhonedoe",
      confirmPassword: "@Jhonedoe",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("At least 1 number");
  });

  it("should fail when new password has no special character", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "Jhonedoe123",
      confirmPassword: "Jhonedoe123",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("At least 1 special character");
  });

  it("should fail when confirm password is empty", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@Jhonedoe123",
      confirmPassword: "",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("Confirm password is required field!");
  });

  it("should fail when new passwords do not match", async () => {
    const data = {
      currentPassword: "@Jhonedoe123",
      newPassword: "@Jhonedoe123",
      confirmPassword: "@Jhonedoe321",
    };

    await expect(
      validations.updateProfilePassword.validate(data),
    ).rejects.toThrow("Passwords must match");
  });
});
