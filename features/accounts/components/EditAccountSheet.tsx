import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm, FormValues } from "./AccountForm";

import { useEditAccount } from "../api/useEditAccount";
import { useGetAccount } from "../api/useGetAccount";
import { useOpenAccount } from "../hooks/useOpenAccount";

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const accountsQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);

  const isLoading = accountsQuery.isLoading;
  const isPending = editMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const defaultValues = accountsQuery.data
    ? { name: accountsQuery.data.name }
    : { name: "" };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={editMutation.isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
