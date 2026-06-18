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
