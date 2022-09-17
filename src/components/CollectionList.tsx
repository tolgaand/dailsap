import { useCollection } from "hooks/useCollection";

export const CollectionList = () => {
  const { data, isLoading } = useCollection();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl py-2 sm:py-24 lg:max-w-none lg:py-4">
        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            data?.map((collection) => (
              <div key={collection.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={collection.image}
                    // alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  {/* <a href={collection.href}> */}
                  <span className="absolute inset-0" />
                  {collection.name}
                  {/* </a> */}
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {collection.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
