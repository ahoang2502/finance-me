"use client";

import { useMount } from "react-use";
import { useState } from "react";
import { usePlaidLink } from "react-plaid-link";

import { useCreateLinkToken } from "../api/useCreateLinkToken";
import { useExchangePublicToken } from "../api/useExchangePublicToken";

import { Button } from "@/components/ui/button";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);

  const createLinkToken = useCreateLinkToken();
  const exchangePublicToken = useExchangePublicToken();

  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({ data }) => {
        setToken(data);
      },
    });
  });

  const plaid = usePlaidLink({
    token: token,
    onSuccess: (publicToken) => {
      exchangePublicToken.mutate({
        publicToken,
      });
    },
    env: "sandbox",
  });

  const isDisabled = !plaid.ready || exchangePublicToken.isPending || isLoading;

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    plaid.open();
  };

  return (
    <Button onClick={onClick} disabled={isDisabled} variant="ghost" size="sm">
      Connect
    </Button>
  );
};
