import Box from "@mui/material/Box";
import { EmployeeDetails } from "./EmployeeDetails";
import { IEmployeeEntity } from "types/employee-entity";
import styles from "./Employees.module.scss";

interface IEmployeesProps {
  employees: IEmployeeEntity[];
  deleteType?: "soft" | "hard";
}

export function Employees({ employees, deleteType }: IEmployeesProps) {
  return (
    <Box className={styles.employeesContainer}>
      {employees.map((employee) => (
        <EmployeeDetails
          deleteType={deleteType}
          key={employee._id}
          employee={employee}
        />
      ))}
    </Box>
  );
}
