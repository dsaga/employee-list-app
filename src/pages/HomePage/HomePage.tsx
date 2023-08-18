import {
  EmployeeCreateDialog,
  EmployeeForm,
  EmployeeProvider,
  Employees,
  useEmployee,
  useGetEmployees,
  useSaveEmployee,
} from "@/features/employee";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useEffect, useState } from "react";
import { ICreateEmployeeDto } from "types/create-employee.dto";

import styles from "./HomePage.module.scss";

export function HomePage() {
  const { employees, isLoading, reload, isMore, next } = useGetEmployees({
    limit: 20,
  });

  const saveEmployee = useSaveEmployee();

  const [isCreating, setIsCreating] = useState(false);

  const handleToggleForm = () => {
    setIsCreating(!isCreating);
  };

  useEffect(() => {
    if (saveEmployee.isSaved) {
      reload();
      isCreating && handleToggleForm();
    }
  }, [saveEmployee.isSaved]);

  const handleSaveForm = (payload: ICreateEmployeeDto) => {
    saveEmployee.save(payload);
  };

  return (
    <EmployeeProvider>
      <Box className={styles.pageContainer} flexDirection={"row"}>
        <Box
          className={styles.pageTitle}
          display="flex"
          justifyContent={"space-around"}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Employees
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              onClick={handleToggleForm}
              size="medium"
              variant={"outlined"}
            >
              Add New Employee
            </Button>
          </Box>
        </Box>

        <EmployeeCreateDialog
          isOpen={isCreating}
          onClose={handleToggleForm}
          onCreate={handleSaveForm}
        />

        <Box
          className={styles.employeesContainer}
          sx={{
            py: 2,
          }}
        >
          {isLoading && <CircularProgress className={styles.loaderAnim} />}
          {employees && <Employees employees={employees} />}
        </Box>

        <Box className={styles.moreContainer}>
          {isMore && (
            <Button onClick={next} size="medium" variant={"outlined"}>
              Show More
            </Button>
          )}
        </Box>
      </Box>
    </EmployeeProvider>
  );
}
