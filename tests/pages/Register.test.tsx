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
  it("should first render", () => {
    renderWithRouter(<Register />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });
});
