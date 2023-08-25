import { IEmployeeEntity } from "types/employee-entity";
import { create } from "zustand";

interface IEmployeeStore {
  employees: IEmployeeEntity[];
  deletedEmployees: IEmployeeEntity[];
  setEmployees: (employees: IEmployeeEntity[]) => void;
  setDeletedEmployees: (employees: IEmployeeEntity[]) => void;
  addEmployee: (employee: IEmployeeEntity) => void;
  deleteEmployee: (id: string) => void;
  hardDelete: (id: string) => void;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
  employees: [],
  deletedEmployees: [],
  addEmployee: (employee: IEmployeeEntity) =>
    set((state) => ({ employees: [...state.employees, employee] })),
  setEmployees: (employees: IEmployeeEntity[]) =>
    set(() => ({ employees: [...employees] })),
  setDeletedEmployees: (employees: IEmployeeEntity[]) =>
    set(() => ({
      deletedEmployees: [...employees],
    })),
  deleteEmployee: (id: string) =>
    set((state) => {
      const employeeToDelete = state.employees.find((e) => e._id === id);
      if (employeeToDelete) {
        return {
          employees: state.employees.filter((e) => e._id !== id),
          deletedEmployees: [...state.deletedEmployees, employeeToDelete],
        };
      }
      return state;
    }),
  hardDelete: (id: string) =>
    set((state) => {
      const employeeToDelete = state.deletedEmployees.find((e) => e._id === id);
      if (employeeToDelete) {
        return {
          deletedEmployees: state.deletedEmployees.filter((e) => e._id !== id),
        };
      }
      return state;
    }),
}));
