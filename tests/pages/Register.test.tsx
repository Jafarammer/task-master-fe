import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../../src/pages/register";
import { renderWithRouter } from "../utils/renderWithRouter";

const mockHandleSubmit = vi.fn();
let mockAuth: any;
const mockNotify = vi.fn();
let mockLocationSearch = "";

const createMockUseAuth = () => ({
  loading: false,
  formikRegister: {
    values: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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

describe("REGISTER PAGE", () => {
  describe("Render", () => {
    it("should first render", () => {
      renderWithRouter(<Register />);
      expect(screen.getByText("Create your account")).toBeInTheDocument();
    });

    it("should render full name input", () => {
      renderWithRouter(<Register />);
      const fullNameInput = screen.getByPlaceholderText("Full Name");
      expect(fullNameInput).toBeInTheDocument();
      expect(fullNameInput).toHaveAttribute("name", "fullName");
      expect(fullNameInput).toHaveAttribute("type", "text");
    });

    it("should render email input", () => {
      renderWithRouter(<Register />);
      const fullNameInput = screen.getByPlaceholderText("Email Address");
      expect(fullNameInput).toBeInTheDocument();
      expect(fullNameInput).toHaveAttribute("name", "email");
      expect(fullNameInput).toHaveAttribute("type", "email");
    });

    it("should render password input", () => {
      renderWithRouter(<Register />);
      const fullNameInput = screen.getByPlaceholderText("Password");
      expect(fullNameInput).toBeInTheDocument();
      expect(fullNameInput).toHaveAttribute("name", "password");
    });

    it("should render confirm password input", () => {
      renderWithRouter(<Register />);
      const fullNameInput = screen.getByPlaceholderText("Confirm Password");
      expect(fullNameInput).toBeInTheDocument();
      expect(fullNameInput).toHaveAttribute("name", "confirmPassword");
    });

    it("should render register button", () => {
      renderWithRouter(<Register />);

      expect(
        screen.getByRole("button", {
          name: /register/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Password Visibility", () => {
    it("should show password when visibility button is clicked", async () => {
      renderWithRouter(<Register />);

      const passwordInput = screen.getByPlaceholderText("Password");

      expect(passwordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle password visibility",
      );

      await userEvent.click(visibilityButton);

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("should hide password when visibility button is clicked twice", async () => {
      renderWithRouter(<Register />);

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

  describe("Confirm Password Visibility", () => {
    it("should show confirm password when visibility button is clicked", async () => {
      renderWithRouter(<Register />);

      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");

      expect(confirmPasswordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle confirm password visibility",
      );

      await userEvent.click(visibilityButton);

      expect(confirmPasswordInput).toHaveAttribute("type", "text");
    });

    it("should hide confirm password when visibility button is clicked twice", async () => {
      renderWithRouter(<Register />);

      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");

      expect(confirmPasswordInput).toHaveAttribute("type", "password");

      const visibilityButton = screen.getByLabelText(
        "toggle confirm password visibility",
      );

      await userEvent.click(visibilityButton);

      expect(confirmPasswordInput).toHaveAttribute("type", "text");

      await userEvent.click(visibilityButton);

      expect(confirmPasswordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Formik Register", () => {
    it("should render empty full name value initially", () => {
      renderWithRouter(<Register />);
      const fullNameInput = screen.getByPlaceholderText("Full Name");
      expect(fullNameInput).toHaveValue("");
    });

    it("should render empty email value initially", () => {
      renderWithRouter(<Register />);
      const emailInput = screen.getByPlaceholderText("Email Address");
      expect(emailInput).toHaveValue("");
    });

    it("should render empty password value initially", () => {
      renderWithRouter(<Register />);
      const passwordInput = screen.getByPlaceholderText("Password");
      expect(passwordInput).toHaveValue("");
    });

    it("should render empty confirm password value initially", () => {
      renderWithRouter(<Register />);
      const confirmPasswordInput =
        screen.getByPlaceholderText("Confirm Password");
      expect(confirmPasswordInput).toHaveValue("");
    });

    it("should call handleSubmit when form is submitted", async () => {
      renderWithRouter(<Register />);

      const registerButton = screen.getByRole("button", {
        name: /register/i,
      });

      await userEvent.click(registerButton);

      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
