import {
  EmployeeFullInformation,
  EmployeeProvider,
  useGetEmployeeDetail,
} from "@/features/employee";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import styles from "./EmployeeDetailPage.module.scss";
import { useParams } from "react-router-dom";

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { employee, isLoading } = useGetEmployeeDetail({
    id,
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
            Employee: {employee?.name}
          </Typography>
        </Box>

        <Box
          className={styles.employeeDetailContainer}
          sx={{
            py: 2,
          }}
        >
          {isLoading && <CircularProgress className={styles.loaderAnim} />}
          {employee && <EmployeeFullInformation employee={employee} />}
        </Box>
      </Box>
    </EmployeeProvider>
  );
}
