import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions)["checkout"]["$post"],
  200
>;

export const useCheckoutSubscription = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions["checkout"]["$post"]();

      if (!response.ok) throw Error("Failed to create checkout session");

      return await response.json();
    },
    onError: () => {
      toast.error("Failed to create checkout session");
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
  });

  return mutation;
};
