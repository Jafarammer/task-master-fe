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
  });
});
