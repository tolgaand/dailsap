import { useCollection } from "hooks/useCollection";

export const CollectionList = () => {
  const { data, isLoading } = useCollection();

  return (
    <div className="flex gap-10 justify-center w-full mt-4">
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        data?.map((collection, index) => (
          <div
            className="rounded-lg shadow-lg bg-white max-w-sm"
            key={collection.id.toBase58()}
          >
            <img
              className="rounded-t-lg"
              src={collection.image}
              alt="Collection Image"
            />
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {collection.name}
              </h5>
              <p className="text-gray-700 text-base mb-4">
                {collection.description}
              </p>
              <span className="block truncate">
                <span className="text-gray-900 text-sm font-medium">Id: </span>
                <span className="text-sm">{collection.id.toBase58()}</span>
              </span>
              <span className="block truncate">
                <span className="text-gray-900 text-sm font-medium">
                  Creator:{" "}
                </span>
                <span className="text-sm">
                  {collection.authority.toBase58()}
                </span>
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
