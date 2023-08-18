import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./EmployeesArchive.module.scss";
import Button from "@mui/material/Button";
import {
  EmployeeProvider,
  Employees,
  useGetEmployees,
} from "@/features/employee";

export function EmployeesArchive() {
  const { employees, isLoading, isMore, next } = useGetEmployees({
    deleted: true,
  });

  return (
    <EmployeeProvider softDelete={false}>
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
            Archive (Deleted Employees)
          </Typography>
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
