import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }) {
  const CLIENT_ID =
    "930249676289-2mrshjktbiu7s9uks2junt3e5qp7ognb.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
