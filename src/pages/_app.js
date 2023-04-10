import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../../src/theme";
import createEmotionCache from "../../src/createEmotionCache";
import Navbar from "components/Navbar/Navbar";
import { useRouter } from "next/router";
import Layout from "components/layout";
import { UserContextProvider } from "store/UserContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const CLIENT_ID =
    "930249676289-2mrshjktbiu7s9uks2junt3e5qp7ognb.apps.googleusercontent.com";

  return (
    <UserContextProvider>
      <Layout>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <Component {...pageProps} />
            </GoogleOAuthProvider>
          </ThemeProvider>
        </CacheProvider>
      </Layout>
    </UserContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

// import "../styles/globals.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// export default function App({ Component, pageProps }) {
//   const CLIENT_ID =
//     "930249676289-2mrshjktbiu7s9uks2junt3e5qp7ognb.apps.googleusercontent.com";
//   return (
//     <GoogleOAuthProvider clientId={CLIENT_ID}>
//       <Component {...pageProps} />
//     </GoogleOAuthProvider>
//   );
// }
