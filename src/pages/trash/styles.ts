import { alpha } from "@mui/material/styles";
import { Theme, SxProps } from "@mui/material/styles";

export const getTaskItemSx =
  (index: number, tasksLength: number): SxProps<Theme> =>
  (theme) => ({
    borderBottomLeftRadius: index === tasksLength - 1 ? "8px" : 0,
    borderBottomRightRadius: index === tasksLength - 1 ? "8px" : 0,
    borderTopLeftRadius: index === 0 ? "8px" : 0,
    borderTopRightRadius: index === 0 ? "8px" : 0,

    // border sesuai theme
    borderTop: index === 0 ? `1px solid ${theme.palette.divider}` : 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,

    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.6)
        : theme.palette.background.paper,
  });

export const chipSx = (): SxProps<Theme> => ({
  borderRadius: 2,
  width: "100px",
  fontSize: {
    xs: "12px",
    sm: "16px",
  },
  "@media (max-width:600px)": {
    width: "64px",
  },
});

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
  mt: 4,
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

export const fontLabelSx = (): SxProps<Theme> => (theme) => ({
  fontSize: {
    xs: "1rem",
    sm: "1.5rem",
  },
});
