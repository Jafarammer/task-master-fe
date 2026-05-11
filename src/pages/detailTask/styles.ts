import { Theme, SxProps } from "@mui/material/styles";

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

export const cardActionSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 6,
  border: "1px solid #08CB00",
  p: 2,
});

export const cardDetailSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 6,
  p: 2,
});

export const iconButtonSX = (): SxProps<Theme> => (theme) => ({
  ":hover": {
    backgroundColor: "transparent",
  },
});

export const chipSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 6,
  width: "152px",
  fontSize: {
    xs: "12px",
    sm: "16px",
  },
  "@media (max-width:600px)": {
    width: "120px",
  },
});
