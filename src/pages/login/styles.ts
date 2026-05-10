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

export const fontBodySX = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "12px",
    sm: "16px",
  },
});

export const fontTitleSX = (): SxProps<Theme> => (theme) => ({
  fontWeight: "bold",
  fontSize: {
    xs: "1.5rem",
    sm: "2rem",
  },
});

export const formControlSX = (): SxProps<Theme> => (theme) => ({
  my: 1.5,
});
