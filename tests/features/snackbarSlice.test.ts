import { describe, it, expect } from "vitest";
import snackbarReducer, {
  showSnackbar,
  hideSnackbar,
} from "../../src/features/components/snackbarSlice";

describe("SNACKBAR SLICE", () => {
  it("should return intial state", () => {
    const state = snackbarReducer(undefined, { type: "" });

    expect(state).toEqual({
      open: false,
      color: "success",
      message: "",
    });
  });

  it("should show snackbar with default success color", () => {
    const state = snackbarReducer(
      undefined,
      showSnackbar({
        message: "Create task success",
      }),
    );
    expect(state.open).toBe(true);
    expect(state.message).toBe("Create task success");
    expect(state.color).toBe("success");
  });

  it("should show snackbar with custome color", () => {
    const state = snackbarReducer(
      undefined,
      showSnackbar({
        message: "Create task failed",
        color: "error",
      }),
    );
    expect(state.open).toBe(true);
    expect(state.message).toBe("Create task failed");
    expect(state.color).toBe("error");
  });

  it.only("should hide snackbar", () => {
    const previousState = {
      open: true,
      color: "success" as const,
      message: "Task created",
    };
    const state = snackbarReducer(previousState, hideSnackbar());

    expect(state.open).toBe(false);
    expect(state.message).toBe("");
    expect(state.color).toBe("success");
  });
});
