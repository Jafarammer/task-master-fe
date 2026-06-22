import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetPassword from "../../src/pages/resetPassword";
import { renderWithRouter } from "../utils/renderWithRouter";

const mockHandleSubmit = vi.fn();
let mockAuth: any;
const mockNotify = vi.fn();
let mockLocationSearch = "";

const createMockUseAuth = () => ({
  loading: false,
  formikResetPassword: {
    values: {
      newPassword: "",
      confirmPassword: "",
    },
    errors: {},
    touched: {},
    isValid: false,
    dirty: false,
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleSubmit: mockHandleSubmit,
  },
});

vi.mock("../../src/hooks/useAuth", () => ({
  default: () => mockAuth,
}));

vi.mock("../../src/hooks/useSnackbarAlert", () => ({
  default: () => mockNotify,
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useLocation: () => ({
      search: mockLocationSearch,
    }),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  mockAuth = createMockUseAuth();
  mockLocationSearch = "";
});

describe("RESET PASSWORD PAGE", () => {
  describe("Render", () => {
    it("should first render", () => {
      renderWithRouter(<ResetPassword />);
      expect(screen.getByText("Reset Password?")).toBeInTheDocument();
    });

    it("should render new password input", () => {
      renderWithRouter(<ResetPassword />);
      const newPasswordInput = screen.getByPlaceholderText("New Password");
      expect(newPasswordInput).toBeInTheDocument();
      expect(newPasswordInput).toHaveAttribute("name", "newPassword");
    });

    it("should render confirm password input", () => {
      renderWithRouter(<ResetPassword />);
      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toHaveAttribute("name", "confirmPassword");
    });

    it("should render button save", () => {
      renderWithRouter(<ResetPassword />);
      const btn = screen.getByRole("button", {
        name: /save/i,
      });

      expect(btn).toBeInTheDocument();
    });
  });

  describe("New Password Visibility", () => {
    it("should show new password when visibility button is clicked", async () => {
      renderWithRouter(<ResetPassword />);

      const newPasswordInput = screen.getByPlaceholderText("New Password");
      expect(newPasswordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle new password visibility",
      );

      await userEvent.click(visibilityButton);
      expect(newPasswordInput).toHaveAttribute("type", "text");
    });

    it("should show new password when visibility button is clicked twice", async () => {
      renderWithRouter(<ResetPassword />);

      const newPasswordInput = screen.getByPlaceholderText("New Password");
      expect(newPasswordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle new password visibility",
      );

      await userEvent.click(visibilityButton);
      expect(newPasswordInput).toHaveAttribute("type", "text");

      await userEvent.click(visibilityButton);

      expect(newPasswordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Confirm Password Visibility", () => {
    it("should show confirm password when visibility button is clicked", async () => {
      renderWithRouter(<ResetPassword />);

      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");
      expect(confirmPasswordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle confirm password visibility",
      );

      await userEvent.click(visibilityButton);
      expect(confirmPasswordInput).toHaveAttribute("type", "text");
    });

    it("should show confirm password when visibility button is clicked twice", async () => {
      renderWithRouter(<ResetPassword />);

      const confirmPassword = screen.getByPlaceholderText("Confirm Password");
      expect(confirmPassword).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle confirm password visibility",
      );

      await userEvent.click(visibilityButton);
      expect(confirmPassword).toHaveAttribute("type", "text");

      await userEvent.click(visibilityButton);

      expect(confirmPassword).toHaveAttribute("type", "password");
    });
  });

  describe("Formik Reset Password", () => {
    it("should render new password value initially", () => {
      renderWithRouter(<ResetPassword />);

      const newPasswordInput = screen.getByPlaceholderText("New Password");

      expect(newPasswordInput).toHaveValue("");
    });

    it("should render confirm password value initially", () => {
      renderWithRouter(<ResetPassword />);

      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");

      expect(confirmPasswordInput).toHaveValue("");
    });

    it("should call handleSubmit when form is submitted", async () => {
      mockAuth.formikResetPassword.isValid = true;
      mockAuth.formikResetPassword.dirty = true;

      renderWithRouter(<ResetPassword />);

      const btn = screen.getByRole("button", {
        name: /save/i,
      });

      await userEvent.click(btn);

      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it("Loading State", () => {
      mockAuth.loading = true;

      renderWithRouter(<ResetPassword />);

      const btn = screen.getByRole("button", {
        name: /save/i,
      });

      expect(btn).toBeDisabled();
    });
  });
});
