import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { EmployeeForm } from "./EmployeeForm";
import { ICreateEmployeeDto } from "types/create-employee.dto";

interface IEmployeeCreateDialogProps {
  onClose: () => void;
  isOpen: boolean;
  onCreate: (payload: ICreateEmployeeDto) => void;
}

export function EmployeeCreateDialog({
  onClose,
  isOpen,
  onCreate,
}: IEmployeeCreateDialogProps) {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Create new employee</DialogTitle>
        <DialogContent>
          <EmployeeForm onSave={onCreate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
