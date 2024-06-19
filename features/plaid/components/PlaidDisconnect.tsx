"use client";

import { useState } from "react";
import { useMount } from "react-use";

import { Button } from "@/components/ui/button";
import { usePlaidLink } from "react-plaid-link";
import { useDeleteConnectedBank } from "../api/useDeleteConnectedBank";
import { useExchangePublicToken } from "../api/useExchangePublicToken";
import { useConfirm } from "@/hooks/useConfirm";

export const PlaidDisconnect = () => {
  const deleteConnectedBank = useDeleteConnectedBank();
  const [Dialog, confirm] = useConfirm(
    "Are you sure?",
    "This will disconnect your bank account, and remove all associated data."
  );

  const onClick = async () => {
    const ok = await confirm();

    if (ok) deleteConnectedBank.mutate();
  };

  return (
    <>
      <Dialog />

      <Button
        size="sm"
        variant="ghost"
        onClick={onClick}
        disabled={deleteConnectedBank.isPending}
      >
        Disconnect
      </Button>
    </>
  );
};
