import { IEmployeeEntity } from "types/index";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRandomUserMeta } from "@/services/useRandomUserMeta";
import { useDeleteEmployee } from "./useDeleteEmployee";
import { EmployeeConfirmDialog } from "./EmployeeConfirmDialog";
import { useState } from "react";
import { EmployeeEditDialog } from "./EmployeeEditDialog";
import { useSaveEmployee } from ".";

interface IEmployeeDetailsProps {
  employee: IEmployeeEntity;
  deleteType?: "soft" | "hard";
}

export function EmployeeDetails({
  employee,
  deleteType = "soft",
}: IEmployeeDetailsProps) {
  const { picture } = useRandomUserMeta({ employeeId: employee._id });
  const { save } = useSaveEmployee();
  const { deleteEmployee } = useDeleteEmployee({
    softDelete: deleteType === "soft",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggleDialog = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const handleToggleEditDialog = () => {
    setIsEditDialogOpen(!isEditDialogOpen);
  };

  const handleDelete = () => {
    deleteEmployee({ employeeId: employee._id });
    handleToggleDialog();
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar src={picture?.medium} />}
          title={employee.name}
          subheader={employee.email}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
          action={
            <>
              <IconButton onClick={handleToggleEditDialog}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleToggleDialog}>
                <Delete />
              </IconButton>
              <EmployeeEditDialog
                isOpen={isEditDialogOpen}
                onClose={handleToggleEditDialog}
                employee={employee}
                onEdit={save}
              />
              <EmployeeConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleToggleDialog}
                onConfirm={handleDelete}
                confirmText={"Delete"}
                headerTitle={`Delete Employee: ${employee.name}`}
                headerMessage={`Are you sure you want to delete ${employee.name}?`}
              />
            </>
          }
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {employee._id}
          </Typography>
          <Typography variant="h5" component="div">
            {employee.name}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
