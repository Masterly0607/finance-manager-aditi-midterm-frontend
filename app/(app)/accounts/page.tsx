"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AccountCard } from "@/components/account-card"
import { Plus } from "lucide-react"
import { Account } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAccount, getAccounts, udpateAccount } from "@/lib/api/accounts"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountsPage() {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  const [newName, setNewName] = useState("")
  const [newBalance, setNewBalance] = useState("")
  const [editName, setEditName] = useState("")

  const queryClient = useQueryClient();

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  const createMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setNewName("");
      setNewBalance("");
      setAddOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: udpateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setEditingAccount(null);
      setEditName("");
      setEditOpen(false);
    },
  });

  function handleAdd() {
    if (!newName.trim()) return;

    createMutation.mutate({
      name: newName.trim(),
      balance: parseFloat(newBalance) || 0,
    });
  }

  function handleEdit() {
    if (!editingAccount || !editName.trim()) return;
    updateMutation.mutate({
      id: editingAccount.id,
      name: editName.trim(),
    });
  }

  const openEdit = useCallback((account: Account) => {
    setEditingAccount(account)
    setEditName(account.name)
    setEditOpen(true)
  }, [])

  if (isLoading) return (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="rounded-lg border p-6 flex flex-col gap-3">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    ))}
  </div>
)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Accounts</h1>
          <p className="text-sm text-muted-foreground">Manage your financial accounts.</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Account</DialogTitle>
              <DialogDescription>Create a new financial account.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-name">Account Name</Label>
                <Input
                  id="add-name"
                  placeholder="e.g. Main Checking"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-balance">Starting Balance</Label>
                <Input
                  id="add-balance"
                  type="number"
                  placeholder="0.00"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!newName.trim()}>
                Create Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <p className="text-muted-foreground">No accounts yet. Create your first account to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account: Account) => (
            <AccountCard key={account.id} account={account} onEdit={openEdit} />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>Update the account name.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-name">Account Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={!editName.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
