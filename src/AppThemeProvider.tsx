import React, { useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";

type AppThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#08CB00",
            light: "#5DF74F",
            dark: "#049000",
          },
          // background: {
          //   default: "#0d1117", // background page
          //   paper: "#1a1f2b", // background card/input
          // },
          // text: {
          //   primary: "#fff",
          //   secondary: "#8a8f98",
          // },
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& textarea": {
                  resize: "both", // bisa di-drag untuk perbesar area
                },
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
