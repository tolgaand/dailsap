import { useDailsapClient } from "framework/DailsapProvider";
import { DailsapClient } from "framework/DaisapClient";
import { useQuery } from "react-query";

export const useCollection = () => {
  const dailsapClient = useDailsapClient();

  return useQuery("COLLECTION", () => dailsapClient?.getCollections());
};
