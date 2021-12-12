import "../styles/globals.css";
import type { AppProps } from "next/app";

import { StyledNavBarComponent } from "../components/styled";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StyledNavBarComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
