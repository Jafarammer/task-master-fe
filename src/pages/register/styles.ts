import type { SxProps, Theme } from "@mui/material/styles";

export const containerSx = (): SxProps<Theme> => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
