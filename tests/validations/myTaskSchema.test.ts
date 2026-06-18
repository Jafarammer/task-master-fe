import { describe, it, expect } from "vitest";
import { validations } from "../../src/validations";

describe("CREATE 0R UPDATE TASK VALIDATION", () => {
  it("should pass when all fields are valid", async () => {
    const data = {
      title: "Ttile task",
      description: "Desc task",
      startDate: "2026-06-23",
      endDate: "2026-06-23",
      priority: "low",
    };

    const result = await validations.myTask.validate(data);
    expect(result).toEqual(data);
  });

  it("should fail when title is empty", async () => {
    const data = {
      title: "",
      description: "Desc task",
      startDate: "2026-06-23",
      endDate: "2026-06-23",
      priority: "low",
    };

    await expect(validations.myTask.validate(data)).rejects.toThrow(
      "Title is required field!",
    );
  });

  it("should fail when description is empty", async () => {
    const data = {
      title: "Title task",
      description: "",
      startDate: "2026-06-23",
      endDate: "2026-06-23",
      priority: "low",
    };

    await expect(validations.myTask.validate(data)).rejects.toThrow(
      "Description is required field!",
    );
  });

  it("should fail when start date is empty", async () => {
    const data = {
      title: "Title task",
      description: "Desc task",
      startDate: "",
      endDate: "2026-06-23",
      priority: "low",
    };

    await expect(validations.myTask.validate(data)).rejects.toThrow(
      "Start date is required field!",
    );
  });

  it("should fail when end date is empty", async () => {
    const data = {
      title: "Title task",
      description: "Desc task",
      startDate: "2026-06-23",
      endDate: "",
      priority: "low",
    };

    await expect(validations.myTask.validate(data)).rejects.toThrow(
      "End date is required field!",
    );
  });

  it("should fail when priority is invalid", async () => {
    const data = {
      title: "Title task",
      description: "Desc task",
      startDate: "2026-06-23",
      endDate: "2026-06-23",
      priority: "Tes",
    };

    await expect(validations.myTask.validate(data)).rejects.toThrow(
      "Priority must be one of, low, medium, high",
    );
  });

  it("should fail when end date is less than start date", async () => {
    const data = {
      title: "Task 1",
      description: "Description",
      startDate: "2026-06-20",
      endDate: "2026-06-19",
      priority: "high",
    };

    await expect(validations.myTask.validate(data)).rejects.toThrow(
      "End date must be greater than start date",
    );
  });
});
