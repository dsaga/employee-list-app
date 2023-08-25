import { IEmployeeEntity } from "types/index";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { CardActions, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRandomUserMeta } from "@/services/useRandomUserMeta";
import { EmployeeConfirmDialog } from "./EmployeeConfirmDialog";
import { useState } from "react";
import { EmployeeEditDialog } from "./EmployeeEditDialog";
import { useEmployee } from ".";

interface IEmployeeDetailsProps {
  employee: IEmployeeEntity;
}

export function EmployeeDetails({ employee }: IEmployeeDetailsProps) {
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
    <Box data-testid="employee-details" sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar src={picture?.medium} />}
          title={
            <RouterLink to={`/employees/${employee._id}`}>
              {employee.name}
            </RouterLink>
          }
          subheader={employee.email}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {employee.phoneNumber}
          </Typography>
          <Typography variant="h5" component="div">
            {employee.name}
          </Typography>
          <Typography variant="body1" component="p">
            {Object.values(employee.homeAddress).join(", ")}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton size="small" onClick={handleToggleEditDialog}>
            <Edit />
          </IconButton>
          <IconButton size="small" onClick={handleToggleDialog}>
            <Delete />
          </IconButton>
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
        </CardActions>
      </Card>
    </Box>
  );
}
