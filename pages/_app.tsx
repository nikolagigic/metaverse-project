import "../styles/globals.css";
import type { AppProps } from "next/app";

import { createTheme, ThemeProvider } from "@mui/material";

import { StyledNavBarComponent } from "../components/styled";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledNavBarComponent />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
