import { Theme, SxProps } from "@mui/material/styles";

export const fontTitleSX = (): SxProps<Theme> => (theme) => ({
  fontWeight: "bold",
  fontSize: {
    xs: "1.5rem",
    sm: "2rem",
  },
});

export const iconButtonSX = (): SxProps<Theme> => (theme) => ({
  ":hover": {
    backgroundColor: "transparent",
  },
});

export const fontBodySX = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "12px",
    sm: "16px",
  },
});

export const formControlSX = (): SxProps<Theme> => (theme) => ({
  my: 1.5,
});

export const selectRenderValueSX = (): SxProps<Theme> => (theme) => ({
  opacity: 0.4,
  fontSize: {
    xs: "12px",
    sm: "16px",
  },
});
