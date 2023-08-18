import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./EmployeesArchive.module.scss";
import Button from "@mui/material/Button";
import { Employees, useGetEmployees } from "@/features/employee";

export function EmployeesArchive() {
  const { employees, isLoading, isMore, next } = useGetEmployees({
    deleted: true,
    limit: 20,
  });

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
        {employees && <Employees deleteType='hard' employees={employees} />}
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
