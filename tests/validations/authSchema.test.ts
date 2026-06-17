import { describe, it, expect } from "vitest";
import { validations } from "../../src/validations";

describe("LOGIN VALIDATION", () => {
  describe("success validation", () => {
    it("should pass when all fields are valid", async () => {
      const data = {
        email: "jhone@example.com",
        password: "@Jhonedoe123",
      };

      const result = await validations.login.validate(data);

      expect(result).toEqual(data);
    });
  });

  describe("email validation", () => {
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
  });

  describe("password validation", () => {
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
});
