import {
  EmployeeForm,
  Employees,
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
  const { save, isSaved } = useSaveEmployee();
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleForm = () => {
    setIsCreating(!isCreating);
  };

  useEffect(() => {
    if (isSaved) {
      reload();
      isCreating && handleToggleForm();
    }
  }, [isSaved]);

  const handleSaveForm = (payload: ICreateEmployeeDto) => {
    save(payload);
  };

  return (
    <Box className={styles.pageContainer} flexDirection={"row"}>
      <Box display="flex" justifyContent={"space-around"}>
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
          <Button onClick={handleToggleForm} size="medium" variant={"outlined"}>
            Add New Employee
          </Button>
        </Box>
      </Box>

      <Dialog
        open={isCreating}
        onClose={handleToggleForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create new employee"}
        </DialogTitle>
        <DialogContent>
          <EmployeeForm onSave={handleSaveForm} />
        </DialogContent>
      </Dialog>

      <Box
        className={styles.employeesContainer}
        sx={{
          py: 2,
        }}
      >
        {isLoading && <CircularProgress className={styles.loaderAnim} />}
        {employees && <Employees deleteType="soft" employees={employees} />}
      </Box>

      <Box className={styles.moreContainer}>
        {isMore && (
          <Button onClick={next} size="medium" variant={"outlined"}>
            Show More
          </Button>
        )}
      </Box>
    </Box>
  );
}
