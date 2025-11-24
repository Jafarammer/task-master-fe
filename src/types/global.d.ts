export type SnackbarState = {
  open: boolean;
  color: "success" | "error" | "info" | "warning";
  message: string;
};
