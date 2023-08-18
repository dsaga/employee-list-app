import { beforeEach, describe, expect, test, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { Employees } from "./Employees";
import { mockEmployees } from "@/test/mocks";
import { useEmployee } from "./EmployeeProvider";
import { useRandomUserMeta } from "@/services/useRandomUserMeta";

vi.mock("@/services/useRandomUserMeta", () => ({
  useRandomUserMeta: vi.fn(),
}));

vi.mock("./EmployeeProvider", async () => {
  const module = await vi.importActual("@/features/employee");
  return {
    ...module!,
    useSaveEmployee: vi.fn(),
    useGetEmployees: vi.fn(),
    useEmployee: vi.fn(),
  };
});

describe("Employees", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the correct number of employees", () => {
    (useEmployee as Mock).mockImplementation(() => ({
      saveEmployee: {
        save: () => {},
        isError: false,
        isSaved: false,
        employee: null,
      },
    }));

    (useRandomUserMeta as Mock).mockReturnValue({
      picture: {
        large: "large-image",
        medium: "medium-image",
        thumbnail: "thumbnail-image",
      },
    });

    render(<Employees employees={mockEmployees} />);
    const employeeDetails = screen.getAllByTestId("employee-details");
    expect(employeeDetails.length).toBe(mockEmployees.length);
  });
});
