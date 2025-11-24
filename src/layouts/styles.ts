import type { SxProps, Theme } from "@mui/material/styles";

export const headerTitleSx = (): SxProps<Theme> => ({
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
});

export const containerSx = (): SxProps<Theme> => ({
  width: "100vw",
  maxWidth: "100vw !important",
  py: 0,
  px: 8,
});

export const toolbarSx = (): SxProps<Theme> => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
