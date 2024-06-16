"use client";

import qs from "query-string";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useGetSummary } from "@/features/summary/api/useGetSummary";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const AccountFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const { data: accounts, isLoading: isAccountsLoading } = useGetAccounts();

  const { isLoading: isSummaryLoading } = useGetSummary();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isAccountsLoading || isSummaryLoading}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>

        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
