import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ApiFormValues, TransactionForm } from "./TransactionForm";

import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { useGetTransaction } from "../api/useGetTransaction";
import { useOpenTransaction } from "../hooks/useOpenTransaction";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const transactionsQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isLoading =
    transactionsQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;
  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionsQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const onSubmit = (values: ApiFormValues) => {
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

  const defaultValues = transactionsQuery.data
    ? {
        accountId: transactionsQuery.data.accountId,
        categoryId: transactionsQuery.data.categoryId,
        amount: transactionsQuery.data.amount.toString(),
        date: transactionsQuery.data.date
          ? new Date(transactionsQuery.data.date)
          : new Date(),
        payee: transactionsQuery.data.payee,
        notes: transactionsQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  return (
    <>
      <ConfirmDialog />

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
