import {
  CreateCollectionPayload,
  UpdateCollectionPayload,
} from "framework/DailsapClient";
import { useDailsapClient } from "framework/DailsapProvider";
import { useMutation, useQueryClient } from "react-query";

export const useCreateCollection = () => {
  const client = useDailsapClient();
  const queryClient = useQueryClient();
  return useMutation(
    "CREATE_COLLECTION",
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

export const useUpdateCollection = () => {
  const client = useDailsapClient();
  const queryClient = useQueryClient();
  return useMutation(
    "UPDATE_COLLECTION",
    (payload: UpdateCollectionPayload) => {
      return client!.updateCollection(payload);
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
