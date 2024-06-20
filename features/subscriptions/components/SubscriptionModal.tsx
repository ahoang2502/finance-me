import React from "react";
import Image from "next/image";

import { useCheckoutSubscription } from "../api/useCheckoutSubscription";
import { useSubscriptionModal } from "../hooks/useSubscriptionModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const SubscriptionModal = () => {
  const checkout = useCheckoutSubscription();
  const { isOpen, onClose } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="logo-dark.svg" alt="logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Upgrade to a paid plan
          </DialogTitle>

          <DialogDescription className="text-center">
            Upgrade to a paid plan to unlock more features
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#03AED2] text-white" />

            <p className="text-sm text-muted-foreground">
              Bank account syncing
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#03AED2] text-white" />

            <p className="text-sm text-muted-foreground">
              Different chart types
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#03AED2] text-white" />

            <p className="text-sm text-muted-foreground">Upload CSV files</p>
          </li>
        </ul>

        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full"
            onClick={() => checkout.mutate()}
            disabled={checkout.isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
