"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
// import { mockAccounts } from "@/lib/mock-data";
import { Props } from "@/lib/types/transactions/add-income.types";
import { TrendingUp } from "lucide-react";

export function AddIncomeDialog({ open, onOpenChange, onSubmit, accounts }: Props) {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [transactionDate, setDate] = useState(new Date().toISOString().split("T")[0]);

  function handleSubmit() {
    if (!accountId || !amount || !note.trim()) return;
    onSubmit({ accountId, amount, note, transactionDate });
    setAccountId("");
    setAmount(0);
    setNote("");
    setDate(new Date().toISOString().split("T")[0]);
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Account</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Note</Label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Input type="date" value={transactionDate} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Income</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
