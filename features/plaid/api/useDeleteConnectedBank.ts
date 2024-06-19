import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["connected-bank"]["$delete"],
  200
>;

export const useDeleteConnectedBank = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"]["$delete"]();

      if (!response.ok) throw Error("Failed to delete the connected bank");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Connected bank deleted!");
    },
    onError: () => {
      toast.error("Failed to delete the connected bank, please try again.");
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return mutation;
};
