import {
  EmployeeCreateDialog,
  EmployeeProvider,
  Employees,
  SaveFormProvider,
  useGetEmployees,
} from "@/features/employee";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import styles from "./HomePage.module.scss";

export function HomePage() {
  console.log('HomePage');
  const { employees, isLoading, reload, isMore, next } = useGetEmployees({
    limit: 20,
  });

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
            <SaveFormProvider onSaved={reload}>
              {({ isActiveForm, onToggleForm, onSaveForm }) => (
                <>
                  <Button
                    onClick={onToggleForm}
                    size="medium"
                    variant={"outlined"}
                  >
                    Add New Employee
                  </Button>
                  <EmployeeCreateDialog
                    isOpen={isActiveForm}
                    onClose={onToggleForm}
                    onCreate={onSaveForm}
                  />
                </>
              )}
            </SaveFormProvider>
          </Box>
        </Box>

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
