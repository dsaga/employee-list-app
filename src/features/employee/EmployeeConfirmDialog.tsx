import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface IEmployeeConfirmDialogProps {
  onClose: () => void;
  isOpen: boolean;
  confirmText: string;
  headerTitle: string;
  headerMessage: string;
  onConfirm: () => void;
}

export function EmployeeConfirmDialog({
  onClose,
  onConfirm,
  isOpen,
  confirmText,
  headerTitle,
  headerMessage,
}: IEmployeeConfirmDialogProps) {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{headerTitle}</DialogTitle>
        <DialogContent>
          <Typography>{headerMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
