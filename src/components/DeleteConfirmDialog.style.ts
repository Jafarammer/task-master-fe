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

export const logoLabelSX = (): SxProps<Theme> => (theme) => ({
  width: {
    xs: 40,
    sm: 64,
  },
  height: {
    xs: 40,
    sm: 64,
  },
  borderRadius: "50%",
  backgroundColor: "#fdebea",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const buttonSX = (): SxProps<Theme> => (theme) => ({
  width: {
    xs: 72,
    sm: 120,
  },
});

export const iconButtonSX = (): SxProps<Theme> => (theme) => ({
  position: "absolute",
  top: 12,
  right: 12,
});

export const dialogContentSX = (): SxProps<Theme> => (theme) => ({
  p: 4,
  position: "relative",
});

export const paperPropsSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 6,
});
