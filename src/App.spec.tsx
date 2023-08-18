import {
  Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { useRandomUserMeta } from "@/services/useRandomUserMeta";
import { useGetEmployees, useSaveEmployee } from "@/features/employee";
import { mockEmployees } from "./test/mocks";

vi.mock("@/services/useRandomUserMeta", () => ({
  useRandomUserMeta: vi.fn(),
}));

vi.mock("@/features/employee", async () => {
  const module = await vi.importActual("@/features/employee");
  return { ...module!, useSaveEmployee: vi.fn(), useGetEmployees: vi.fn() };
});

describe("App", () => {
  beforeEach(() => {
    (useSaveEmployee as Mock).mockReturnValue({
      employee: null,
      isSaved: false,
      isError: false,
      save: () => {},
    });

    (useGetEmployees as Mock).mockReturnValue({
      employees: mockEmployees,
      isLoading: false,
      isMore: false,
      reload: () => {},
      next: () => {},
    });

    (useRandomUserMeta as Mock).mockReturnValue({
      picture: {
        large: "large-image",
        medium: "medium-image",
        thumbnail: "thumbnail-image",
      },
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should render the home page with list of employees", () => {
    expect(screen.getByText("Employees")).toBeDefined();
    expect(screen.getAllByTestId("employee-details")).toHaveLength(2);
  });
});
