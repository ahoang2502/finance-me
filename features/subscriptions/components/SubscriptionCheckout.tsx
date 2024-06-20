import React from "react";

import { useCheckoutSubscription } from "../api/useCheckoutSubscription";
import { useGetSubscription } from "../api/useGetSubscription";

import { Button } from "@/components/ui/button";

export const SubscriptionCheckout = () => {
  const checkout = useCheckoutSubscription();
  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetSubscription();

  return (
    <Button
      onClick={() => checkout.mutate()}
      size="sm"
      variant="primaryPink"
      disabled={checkout.isPending || isSubscriptionLoading}
    >
      {subscription ? "Manage" : "Upgrade"}
    </Button>
  );
};
