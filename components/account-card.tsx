"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Wallet } from "lucide-react"
import { Account } from "@/lib/types"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

interface AccountCardProps {
  account: Account
  onEdit: (account: Account) => void
}

export function AccountCard({ account, onEdit }: AccountCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              {account.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Created {account.createdAt}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onEdit(account)}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit {account.name}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground">
          {formatCurrency(account.balance)}
        </p>
      </CardContent>
    </Card>
  )
}
