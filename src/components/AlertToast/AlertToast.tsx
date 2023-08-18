import { SnackbarProvider, useSnackbar } from "notistack";
import { useCallback } from "react";

interface IToastProps {
  message: string;
  severity: "success" | "error";
}

export function AlertToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}

export function useAlertToasts() {
  const { enqueueSnackbar } = useSnackbar();

  const addAlert = useCallback(
    (toast: IToastProps) => {
      enqueueSnackbar(toast.message, {
        variant: toast.severity,
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    [enqueueSnackbar]
  );

  return { addAlert };
}
