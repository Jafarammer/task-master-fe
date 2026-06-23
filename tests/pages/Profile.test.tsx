import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { useAppSelector } from "../../src/app/hooks";
import Profile from "../../src/pages/profile";
import { renderWithRouter } from "../utils/renderWithRouter";

let mockProfile: any;

const createMockUseProfile = () => ({
  fileInputRef: {
    current: null,
  },

  onChangePicture: vi.fn(),

  loadingUpdatePicture: false,

  loading: false,

  isUpdate: false,

  setIsUpdate: vi.fn(),

  formikUpdateProfile: {
    values: {
      fullName: "Jhone Doe",
      email: "jhone@example.com",
    },

    errors: {},
    touched: {},

    dirty: true,
    isValid: true,

    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleSubmit: vi.fn(),

    resetForm: vi.fn(),
  },
});

const mockNavigate = vi.fn();

vi.mock("../../src/app/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("../../src/hooks/useProfile", () => ({
  default: () => mockProfile,
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [
      {
        get: vi.fn(() => "all"),
      },
    ],
  };
});

const mockUseAppSelector = vi.mocked(useAppSelector);

beforeEach(() => {
  vi.clearAllMocks();

  mockProfile = createMockUseProfile();

  mockUseAppSelector.mockImplementation((selector: any) =>
    selector({
      profile: {
        profiles: {
          fullName: "Jhone Doe",
          email: "jhone@example.com",
          profilePicture: "",
        },
      },
    }),
  );
});

describe("PROFILE PAGE", () => {
  describe("Render", () => {
    it("should first render", () => {
      renderWithRouter(<Profile />);
      expect(screen.getByText("Profile Settings")).toBeInTheDocument();
      expect(
        screen.getByText("Manage your account details and preferences."),
      ).toBeInTheDocument();
    });
  });
});
