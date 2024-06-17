"use client";

import { useMount } from "react-use";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCreateLinkToken } from "../api/useCreateLinkToken";

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);

  const createLinkToken = useCreateLinkToken();

  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({ data }) => {
        setToken(data);
      },
    });
  });

  return (
    <Button disabled={!token} variant="ghost" size="sm">
      Connect
    </Button>
  );
};
