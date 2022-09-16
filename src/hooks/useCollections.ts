import { CreateCollectionPayload } from "framework/DailsapClient";
import { useDailsapClient } from "framework/DailsapProvider";
import { useMutation, useQueryClient } from "react-query";

export const useCreateCollection = () => {
  const client = useDailsapClient();
  const queryClient = useQueryClient();
  return useMutation(
    "CREATE_GAME",
    (payload: CreateCollectionPayload) => {
      return client!.createCollection(payload);
    },
    {
      onSuccess: (data, payload) => {
        queryClient.invalidateQueries("COLLECTION");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
