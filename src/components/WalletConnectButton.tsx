import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletConnectButton = () => {
  return (
    <WalletMultiButton className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm h-auto" />
  );
};
