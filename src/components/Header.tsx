import { useState } from "react";
import { CreateCollection } from "./CreateCollection";
import { WalletConnectButton } from "./WalletConnectButton";

export const Header = () => {
  const [createCollectionOpen, setCreateCollectionOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <span className="py-2 px-4 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-500 relative inline-block">
            <span className="relative text-white text-lg">dailsap.</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCreateCollectionOpen(true)}
              className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
            >
              Create Collection
            </button>

            <WalletConnectButton />
          </div>
        </div>
      </div>
      <CreateCollection
        open={createCollectionOpen}
        setOpen={setCreateCollectionOpen}
      />
    </header>
  );
};
