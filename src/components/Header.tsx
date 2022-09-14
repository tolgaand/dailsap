import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <span className="py-2 px-4 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-500 relative inline-block">
            <span className="relative text-white text-lg">dailsap.</span>
          </span>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
};
