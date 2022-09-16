import "@solana/wallet-adapter-react-ui/styles.css";
import "assets/styles/style.scss";

import type { AppProps } from "next/app";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { QueryClient, QueryClientProvider } from "react-query";

const wallets = [new PhantomWalletAdapter()];
import { useClusterUrl } from "hooks/useClusterUrl";
import { DailsapContextProvider } from "framework/DailsapProvider";

const queryClient = new QueryClient();

function MyApp(props: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Inner {...props} />
    </QueryClientProvider>
  );
}

function Inner({ Component, pageProps }: AppProps) {
  const { data: endpoint } = useClusterUrl();

  return (
    <>
      {endpoint && (
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <DailsapContextProvider>
              <WalletModalProvider>
                <Component {...pageProps} />
              </WalletModalProvider>
            </DailsapContextProvider>
          </WalletProvider>
        </ConnectionProvider>
      )}
    </>
  );
}

export default MyApp;
