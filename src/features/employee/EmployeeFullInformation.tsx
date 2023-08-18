import { IEmployeeEntity } from "types/index";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRandomUserMeta } from "@/services/useRandomUserMeta";
import { EmployeeConfirmDialog } from "./EmployeeConfirmDialog";
import { useState } from "react";
import { EmployeeEditDialog } from "./EmployeeEditDialog";
import { useEmployee } from ".";

import styles from "./EmployeeFullInformation.module.scss";

interface IEmployeeFullInformationProps {
  employee: IEmployeeEntity;
}

export function EmployeeFullInformation({
  employee,
}: IEmployeeFullInformationProps) {
  const { picture } = useRandomUserMeta({ employeeId: employee._id });

  const { saveEmployee, deleteEmployee } = useEmployee();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggleDialog = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const handleToggleEditDialog = () => {
    setIsEditDialogOpen(!isEditDialogOpen);
  };

  const handleDelete = () => {
    deleteEmployee.save({ employeeId: employee._id });
    handleToggleDialog();
  };

  return (
    <Box
      display="flex"
      justifyContent={"space-evenly"}
      data-testid="employee-info"
    >
      <Box sx={{ minWidth: 300 }}>
        <Avatar
          src={picture?.large}
          style={{ width: "200px", height: "200px", margin: "auto" }}
        />
      </Box>
      <Box className={styles.infoContainer}>
        <Box className={styles.infoActionItems}>
          <IconButton onClick={handleToggleEditDialog}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleToggleDialog}>
            <Delete />
          </IconButton>
        </Box>

        <EmployeeEditDialog
          isOpen={isEditDialogOpen}
          onClose={handleToggleEditDialog}
          employee={employee}
          onEdit={saveEmployee.save}
        />
        <EmployeeConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleToggleDialog}
          onConfirm={handleDelete}
          confirmText={"Delete"}
          headerTitle={`Delete Employee: ${employee.name}`}
          headerMessage={`Are you sure you want to delete ${employee.name}?`}
        />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {employee.phoneNumber}
        </Typography>
        <Typography className={styles.infoItem}  variant="h5" component="div">
          {employee.name}
        </Typography>
        <Typography className={styles.infoItem} variant="body1" component="p">
          {Object.values(employee.homeAddress).join(", ")}
        </Typography>
        <Typography className={styles.infoItem} variant="body1" component="p">
          Email Address: {employee.email}
        </Typography>
        <Typography className={styles.infoItem} variant="body1" component="p">
          Date of Birth: {employee.dateOfBirth}
        </Typography>
        <Typography className={styles.infoItem} variant="body1" component="p">
          Date of Employment: {employee.dateOfEmployment}
        </Typography>
      </Box>
    </Box>
  );
}
