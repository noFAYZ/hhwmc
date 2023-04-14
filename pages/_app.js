import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import {Mumbai} from "@thirdweb-dev/chains"

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "m";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={Mumbai}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
