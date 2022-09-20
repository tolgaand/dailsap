import { Collection } from "framework/DailsapClient";
import { useCollection } from "hooks/useCollection";
import Link from "next/link";
import { useState } from "react";
import { CreateCollection } from "./CreateCollection";

export const CollectionList = () => {
  const { data, isLoading } = useCollection();
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();

  const handleUpdateCollection = (collection: Collection) => {
    setSelectedCollection(collection);
    setShowCreateCollection(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl py-2 sm:py-24 lg:max-w-none lg:py-4">
        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 lg:gap-12">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            data?.map((collection) => (
              <div key={collection.id.toBase58()} className="group relative">
                <Link href={`/collections/${collection.id.toBase58()}`}>
                  <a>
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={collection.image}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </a>
                </Link>
                <div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    {/* <a href={collection.href}> */}
                    {collection.name}
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {collection.description}
                  </p>
                  <h3 className="text-sm text-gray-500 truncate">
                    Creator: {collection.authority.toBase58()}
                  </h3>
                </div>

                <button
                  className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-indigo-400 rounded-full focus:shadow-outline hover:bg-indigo-500"
                  onClick={() => handleUpdateCollection(collection)}
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </div>

      <CreateCollection
        open={showCreateCollection}
        setOpen={setShowCreateCollection}
        selectedCollection={selectedCollection}
      />
    </div>
  );
};
