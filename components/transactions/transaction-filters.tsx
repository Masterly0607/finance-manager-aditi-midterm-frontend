"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccounts } from "@/lib/hooks/transactions/useTransactions";
import { useEffect } from "react";

interface Props {
  filterAccount: string;
  filterType: string;
  searchNote: string;
  onAccountChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onSearchChange: (v: string) => void;
}

export function TransactionFilters(props: Props) {
  const { data: accounts, isLoading } = useAccounts();

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-2">
        <Label className="text-xs text-muted-foreground">Account</Label>
        <Select value={props.filterAccount} onValueChange={props.onAccountChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            {isLoading && (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            )}

            {accounts?.map((a) => (
              <SelectItem key={`account-${a.id}`} value={String(a.id)}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Label className="text-xs text-muted-foreground">Type</Label>
        <Select value={props.filterType} onValueChange={props.onTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="TRANSFER">Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Label className="text-xs text-muted-foreground">Search Note</Label>
        <Input
          placeholder="Search..."
          value={props.searchNote}
          onChange={(e) => props.onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
