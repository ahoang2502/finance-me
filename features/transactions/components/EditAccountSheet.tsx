import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm, FormValues } from "./AccountForm";

import { useEditAccount } from "../api/useEditTransaction";
import { useGetAccount } from "../api/useGetTransaction";
import { useOpenAccount } from "../hooks/useOpenTransaction";
import { useDeleteAccount } from "../api/useDeleteTransaction";
import { useConfirm } from "@/hooks/useConfirm";

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const accountsQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = accountsQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok)
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      });
  };

  const defaultValues = accountsQuery.data
    ? { name: accountsQuery.data.name }
    : { name: "" };

  return (
    <>
      <ConfirmDialog />

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
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
