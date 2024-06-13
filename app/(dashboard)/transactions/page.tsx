"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { transactions as transactionsSchema } from "@/db/schema";
import { columns } from "./_components/Columns";
import { ImportCard } from "./_components/ImportCard";
import { UploadButton } from "./_components/UploadButton";

import { useSelectAccount } from "@/features/accounts/hooks/useSelectAccount";
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransactions";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/useBulkCreateTransactions";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
  const [AccountDialog, confirm] = useSelectAccount();

  const { onOpen } = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  const deleteTransactions = useBulkDeleteTransactions();
  const createTransactions = useBulkCreateTransactions();

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const onSubmitImport = async (
    values: (typeof transactionsSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) return toast.error("Please select an account to continue");

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transactionsQuery.isLoading)
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="">
            <Skeleton className="h-8 w-48 " />
          </CardHeader>

          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

  if (variant === VARIANTS.IMPORT)
    return (
      <>
        <AccountDialog />
        <ImportCard
          onCancel={onCancelImport}
          data={importResults.data}
          onSubmit={onSubmitImport}
        />
      </>
    );

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>

          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              size="sm"
              onClick={onOpen}
              variant="primaryPink"
              className="w-full lg:w-auto"
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>

            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
