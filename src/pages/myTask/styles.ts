// taskFilter.styles.ts
import type { Theme } from "@mui/material";

export const toggleGroupSx = (theme: Theme) => ({
  width: { xs: "100%", sm: "auto" },
  bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "#f1f5f9",
  borderRadius: "8px",
  p: 0.5,
  display: "flex",
  gap: 1,
  ".MuiToggleButton-root": {
    flex: { xs: 1, sm: "initial" },
    textTransform: "none",
    border: "none",
    borderRadius: "8px",
    px: { xs: 1, sm: 3 },
    fontSize: 14,
    color:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.7)"
        : "rgba(0,0,0,0.7)",
    transition: "all 150ms ease",
  },
  ".MuiToggleButton-root.Mui-selected": {
    bgcolor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.06)",
    color: theme.palette.getContrastText(
      theme.palette.mode === "dark" ? "#111827" : "#ffffff"
    ),
    fontWeight: 700,
  },
});
