import { Snackbar, Alert, IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { hideSnackbar } from "../features/snackbar/snackbarSlice";

const SnackbarAlert = () => {
  const dispatch = useAppDispatch();
  const { open, message, color } = useAppSelector((state) => state.snackbar);
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={color}
        variant="filled"
        sx={{ width: "100%", color: "white" }}
        action={
          <IconButton size="small" onClick={() => dispatch(hideSnackbar())}>
            <Cancel fontSize="small" sx={{ color: "white" }} />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
