import { Theme, SxProps } from "@mui/material/styles";

export const iconButtonSX = (): SxProps<Theme> => (theme) => ({
  ":hover": {
    backgroundColor: "transparent",
  },
});

export const cardSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 4,
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

export const cardListSX = (): SxProps<Theme> => (theme) => ({
  borderRadius: 4,
});

export const cardListContentSX = (): SxProps<Theme> => (theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: {
    xs: "flex-start",
    sm: "center",
  },
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
  bgcolor: "#08CB00",
  mb: 2,
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

export const storageIconSX = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "20px",
    sm: "32px",
  },
});

export const buttonSx = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "8px",
    sm: "12px",
  },
  whiteSpace: "nowrap",
  width: {
    xs: "100%",
    sm: "120px",
  },
});

export const buttonTitleSX = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "8px",
    sm: "12px",
  },
  whiteSpace: "nowrap",
});
