import { useQuery } from "react-query";

export const useClusterUrl = () => {
  return useQuery("CLUSTER_URL", async () => {
    const response = await fetch("/api/get-cluster-url");
    return (await response.json()).clusterUrl as string;
  });
};
