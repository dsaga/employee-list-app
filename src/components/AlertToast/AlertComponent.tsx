import MuiAlert, { AlertProps } from "@mui/material/Alert";

export function AlertComponent(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
