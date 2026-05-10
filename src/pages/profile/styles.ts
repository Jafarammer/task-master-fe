import { Theme, SxProps } from "@mui/material/styles";

export const iconButtonSX = (): SxProps<Theme> => (theme) => ({
  ":hover": {
    backgroundColor: "transparent",
  },
});

export const cardSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 6,
  border: "1px solid #08CB00",
  p: 2,
});

export const cardContentSX = (): SxProps<Theme> => (theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

export const avatartSX = (): SxProps<Theme> => (theme) => ({
  width: {
    xs: 40,
    sm: 80,
  },
  height: {
    xs: 40,
    sm: 80,
  },
  mb: 2,
});

export const buttonTextSX = (): SxProps<Theme> => (theme) => ({
  mb: 2,
  textTransform: "none",
});

export const dividerLineSX = (): SxProps<Theme> => (theme) => ({
  mt: 3,
});

export const formLabelSX = (): SxProps<Theme> => (theme) => ({
  mb: 1,
  fontSize: {
    xs: "12px",
    sm: "16px",
  },
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

export const fontLabelSx = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "1rem",
    sm: "1.5rem",
  },
});
