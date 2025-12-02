import { Theme, SxProps } from "@mui/material/styles";

export const titleSx = (): SxProps<Theme> => ({
  fontSize: { xs: "1.25rem", sm: "2rem" },
  fontWeight: 700,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "75%",
});

export const chipStatusSx = (): SxProps<Theme> => ({
  borderRadius: "4px",
  color: "white",
  fontWeight: "bold",
  flexShrink: 0,
});

export const chipProritySx = (): SxProps<Theme> => ({
  fontWeight: "bold",
  borderRadius: "4px",
  mt: 0.5,
});

export const buttonActionSx = (): SxProps<Theme> => ({
  fontWeight: "bold",
  textTransform: "none",
});
