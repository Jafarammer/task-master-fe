import type { SxProps, Theme } from "@mui/material/styles";

export const containerSx = (): SxProps<Theme> => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const linkContainerSx = (): SxProps<Theme> => ({
  display: "flex",
  justifyContent: "flex-end",
  mt: 1,
});

export const linkForgotPasswordSx = (): SxProps<Theme> => ({
  color: "text.secondary",
  fontSize: "0.9rem",
  fontWeight: 500,
});
