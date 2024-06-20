"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { useGetConnectedBank } from "@/features/plaid/api/useGetConnectedBank";
import { PlaidDisconnect } from "@/features/plaid/components/PlaidDisconnect";
import { useGetSubscription } from "@/features/subscriptions/api/useGetSubscription";
import { SubscriptionCheckout } from "@/features/subscriptions/components/SubscriptionCheckout";
import { PlaidConnect } from "../../../../features/plaid/components/PlaidConnect";

export const SettingsCard = () => {
  const { data: connectedBank, isLoading: isConnectedBankLoading } =
    useGetConnectedBank();

  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetSubscription();

  if (isConnectedBankLoading || isSubscriptionLoading)
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl line-clamp-1">
            <Skeleton className="h-6 w-24" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[350px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Bank connect */}
        <Separator />

        <div className="flex flex-col gap-y-2 lg:flex-row items-center py-4">
          <p className="text-sm font-medium w-full lg:w-[16.5rem] ">
            Bank account
          </p>

          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !connectedBank && "text-muted-foreground"
              )}
            >
              {connectedBank
                ? "Bank account connected"
                : "No bank account connected"}
            </div>

            {connectedBank ? <PlaidDisconnect /> : <PlaidConnect />}
          </div>
        </div>

        {/* Subscription */}
        <Separator />

        <div className="flex flex-col gap-y-2 lg:flex-row items-center py-4">
          <p className="text-sm font-medium w-full lg:w-[16.5rem] ">
            Subscription
          </p>

          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !subscription && "text-muted-foreground"
              )}
            >
              {subscription
                ? `Subscription ${subscription.status}`
                : "No active subscription"}
            </div>

            <SubscriptionCheckout />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
