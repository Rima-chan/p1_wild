import dynamic from "next/dynamic";
import { WildersProvider } from "../context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <WildersProvider>
      <Component {...pageProps} />
    </WildersProvider>
  );
}
// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
