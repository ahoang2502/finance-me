import { useGetSubscription } from "../api/useGetSubscription";
import { useSubscriptionModal } from "./useSubscriptionModal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();
  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetSubscription();

  const shouldBlock = !subscription || subscription.status === "expired";

  return {
    isLoading: isSubscriptionLoading,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
