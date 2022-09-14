import { useCollection } from "hooks/useCollection";

export const CollectionList = () => {
  const { data, isLoading } = useCollection();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        data?.map((collection, index) => (
          <span key={index}>
            {collection.name} <br />
            {collection.description} <br />
            {collection.image_uri} <br />
          </span>
        ))}
    </div>
  );
};
