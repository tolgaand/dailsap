import { useQuery } from "react-query";

export const useProgramId = () => {
  return useQuery("PROGRAM_ID", async () => {
    const response = await fetch("/api/get-program-id");
    return (await response.json()).programId as string;
  });
};
