import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IEmployeeEntity } from "types/employee-entity";
import { EmployeeForm } from "./EmployeeForm";
import { ICreateEmployeeDto } from "types/create-employee.dto";

interface IEmployeeEditDialogProps {
  onClose: () => void;
  isOpen: boolean;
  employee: IEmployeeEntity;
  onEdit: (payload: ICreateEmployeeDto) => void;
}

export function EmployeeEditDialog({
  onClose,
  isOpen,
  employee,
  onEdit,
}: IEmployeeEditDialogProps) {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Edit Employee: {employee.name}</DialogTitle>
        <DialogContent>
          <EmployeeForm  employee={employee} onSave={onEdit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
