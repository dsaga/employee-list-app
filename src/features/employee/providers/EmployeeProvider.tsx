import React, { createContext, useContext } from "react";
import { useSaveEmployee, useDeleteEmployee } from "@/features/employee";

interface IEmployeeContext {
  saveEmployee: ReturnType<typeof useSaveEmployee>;
  deleteEmployee: ReturnType<typeof useDeleteEmployee>;
}

interface IEmployeeProviderProps {
  children: React.ReactNode;
  softDelete?: boolean;
}

export const EmployeeContext = createContext<IEmployeeContext>({
  saveEmployee: {
    save: () => {},
    isError: false,
    isSaved: false,
    employee: null,
  },
  deleteEmployee: { save: () => {}, isDeleted: false },
});

export function EmployeeProvider({
  children,
  softDelete = true,
}: IEmployeeProviderProps) {
  const saveEmployee = useSaveEmployee();
  const deleteEmployee = useDeleteEmployee({ softDelete });

  return (
    <EmployeeContext.Provider value={{ saveEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
