"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransferForm } from "@/components/transfer-form";

import { useTransfer } from "@/lib/hooks/transactions/useTransfer";
import { useAccounts, useTransactions } from "@/lib/hooks/transactions/useTransactions";
import { CreateTransferRequest } from "@/lib/types/transfer/tranfer.types";

export default function TransferPage() {
  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const { mutate, isPending, isSuccess, isError, error } = useTransfer();

  const { data: transactionsData } = useTransactions({
    account: "all",
    type: "all",
    search: "",
    page: 0,
    pageSize: 8,
  });

  const enrichedTransactions =
    transactionsData?.transactions.map((txn) => {
      const account = accounts?.find((a) => String(a.id) === String(txn.accountId));

      return {
        ...txn,
        accountName: account?.name ?? `Account ${txn.accountId}`,
      };
    }) ?? [];
  function handleTransfer(data: CreateTransferRequest) {
    mutate(data);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Transfer</h1>
        <p className="text-sm text-muted-foreground">Transfer funds between your accounts.</p>
      </div>

      <div className="flex flex-col gap-6">
        <TransferForm accounts={accounts ?? []} onTransfer={handleTransfer} isLoading={isPending} />
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TransactionTable
              transactions={enrichedTransactions?.filter((tx) => tx.type === "TRANSFER") ?? []}
            />
          </CardContent>
        </Card>
      </div>
      {isError && <p className="text-red-500 text-sm">Something went wrong: {error?.message}</p>}

      {isSuccess && <p className="text-green-500 text-sm">Transfer successful!</p>}
    </div>
  );
}
