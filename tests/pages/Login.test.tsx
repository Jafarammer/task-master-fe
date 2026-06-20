import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../src/pages/login";
import { renderWithRouter } from "../utils/renderWithRouter";

const mockHandleSubmit = vi.fn();
let mockAuth: any;
const mockNotify = vi.fn();
let mockLocationSearch = "";

const createMockUseAuth = () => ({
  loading: false,
  formikLogin: {
    values: {
      email: "",
      password: "",
    },
    errors: {},
    touched: {},
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

describe("LOGIN PAGE", () => {
  describe("Render", () => {
    it("should first render", () => {
      renderWithRouter(<Login />);

      expect(screen.getByText("Welcome back")).toBeInTheDocument();
    });

    it("should render email input", () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("name", "email");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("should render password input", () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByPlaceholderText("Password");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("name", "password");
    });

    it("should render login button", () => {
      renderWithRouter(<Login />);

      expect(
        screen.getByRole("button", {
          name: /log in/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Password Visibility", () => {
    it("should show password when visibility button is clicked", async () => {
      renderWithRouter(<Login />);

      const passwordInput = screen.getByPlaceholderText("Password");

      expect(passwordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle password visibility",
      );

      await userEvent.click(visibilityButton);

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("should hide password when visibility button is clicked twice", async () => {
      renderWithRouter(<Login />);

      const passwordInput = screen.getByPlaceholderText("Password");

      expect(passwordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle password visibility",
      );

      await userEvent.click(visibilityButton);

      expect(passwordInput).toHaveAttribute("type", "text");

      await userEvent.click(visibilityButton);

      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Formik Login", () => {
    it("should render empty email value initially", () => {
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toHaveValue("");
    });

    it("should render empty password value initially", () => {
      renderWithRouter(<Login />);

      const passwordInput = screen.getByPlaceholderText("Password");
      expect(passwordInput).toHaveValue("");
    });

    it("should call handleSubmit when form is submitted", async () => {
      renderWithRouter(<Login />);

      const loginButton = screen.getByRole("button", {
        name: /log in/i,
      });

      await userEvent.click(loginButton);

      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Validation Error Message", () => {
    it("should render email validation error", () => {
      mockAuth.formikLogin.errors = {
        email: "Email is required field!",
      };

      mockAuth.formikLogin.touched = {
        email: true,
      };

      renderWithRouter(<Login />);

      expect(screen.getByText("Email is required field!")).toBeInTheDocument();
    });

    it("should render format email validation error", () => {
      mockAuth.formikLogin.values = {
        email: "invalid-email",
      };
      mockAuth.formikLogin.errors = {
        email: "Invalid email format!",
      };
      mockAuth.formikLogin.touched = {
        email: true,
      };

      renderWithRouter(<Login />);
      expect(screen.getByText("Invalid email format!")).toBeInTheDocument();
    });

    it("should render password validation error", () => {
      mockAuth.formikLogin.errors = {
        password: "Password is required field!",
      };
      mockAuth.formikLogin.touched = {
        password: true,
      };

      renderWithRouter(<Login />);

      expect(
        screen.getByText("Password is required field!"),
      ).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should disabled login button when loading", () => {
      mockAuth.loading = true;

      renderWithRouter(<Login />);

      const loginButton = screen.getByRole("button", {
        name: /log in/i,
      });

      expect(loginButton).toBeDisabled();
    });
  });

  describe("Router", () => {
    it("should render register link", () => {
      renderWithRouter(<Login />);
      const registerLink = screen.getByRole("link", {
        name: /sign up/i,
      });

      expect(registerLink).toHaveAttribute("href", "/register");
    });

    it("should render forgot password link", () => {
      renderWithRouter(<Login />);
      const forgotPasswordLink = screen.getByRole("link", {
        name: /forgot your password/i,
      });

      expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
    });
  });

  describe.only("Query Params", () => {
    it("should show valid activation token message from query params", () => {
      mockLocationSearch =
        "?status=success&message=Account%20activated%20successfully";
      renderWithRouter(<Login />);
      expect(mockNotify).toHaveBeenCalledWith(
        "Account activated successfully",
        "success",
      );
    });

    it("should show invalid activation token message from query params", () => {
      mockLocationSearch = "?status=error&message=Invalid%20activation%20token";
      renderWithRouter(<Login />);
      expect(mockNotify).toHaveBeenCalledWith(
        "Invalid activation token",
        "error",
      );
    });
  });
});
