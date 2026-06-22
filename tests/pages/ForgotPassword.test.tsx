import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "../../src/pages/forgotPassword";
import { renderWithRouter } from "../utils/renderWithRouter";

const mockHandleSubmit = vi.fn();
let mockAuth: any;
const mockNotify = vi.fn();
let mockLocationSearch = "";
const mockNavigate = vi.fn();

const createMockUseAuth = () => ({
  loading: false,
  formikForgotPassword: {
    values: {
      email: "",
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
    useNavigate: () => mockNavigate,
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

describe("FORGOT PASSWORD PAGE", () => {
  describe("Render", () => {
    it("should first render", () => {
      renderWithRouter(<ForgotPassword />);

      expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    });

    it("should render email input", () => {
      renderWithRouter(<ForgotPassword />);
      const emailInput = screen.getByPlaceholderText("Email Address");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("name", "email");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("should render send recovery instructions button", () => {
      renderWithRouter(<ForgotPassword />);
      const btn = screen.getByRole("button", {
        name: /send recovery instructions/i,
      });

      expect(btn).toBeInTheDocument();
    });
  });

  describe("Formik Forgot Password", () => {
    it("should render empty email value initially", () => {
      renderWithRouter(<ForgotPassword />);
      const emailInput = screen.getByPlaceholderText("Email Address");
      expect(emailInput).toHaveValue("");
    });

    it("should call handleSubmit when form is submitted", async () => {
      mockAuth.formikForgotPassword.isValid = true;
      mockAuth.formikForgotPassword.dirty = true;

      renderWithRouter(<ForgotPassword />);
      const btn = screen.getByRole("button", {
        name: /send recovery instructions/i,
      });

      await userEvent.click(btn);

      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Loading State", () => {
    it("should disabled send recovery instructions when loading", () => {
      renderWithRouter(<ForgotPassword />);

      const btn = screen.getByRole("button", {
        name: /send recovery instructions/i,
      });
      expect(btn).toBeDisabled();
    });
  });

  describe("Router", () => {
    it("should navigate to login page when return button is clicked", async () => {
      renderWithRouter(<ForgotPassword />);

      const btn = screen.getByRole("button", {
        name: /return to login page/i,
      });

      await userEvent.click(btn);

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
