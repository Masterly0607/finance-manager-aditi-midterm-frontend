"use client"

import { useState } from "react"
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
import { mockAccounts } from "@/lib/mock-data"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  // Add account form state
  const [newName, setNewName] = useState("")
  const [newBalance, setNewBalance] = useState("")

  // Edit account form state
  const [editName, setEditName] = useState("")

  function handleAdd() {
    if (!newName.trim()) return
    const newAccount: Account = {
      id: `a${Date.now()}`,
      userId: "u1",
      name: newName.trim(),
      balance: parseFloat(newBalance) || 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setAccounts((prev) => [...prev, newAccount])
    setNewName("")
    setNewBalance("")
    setAddOpen(false)
  }

  function handleEdit() {
    if (!editingAccount || !editName.trim()) return
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === editingAccount.id ? { ...a, name: editName.trim() } : a
      )
    )
    setEditingAccount(null)
    setEditName("")
    setEditOpen(false)
  }

  function openEdit(account: Account) {
    setEditingAccount(account)
    setEditName(account.name)
    setEditOpen(true)
  }

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
          {accounts.map((account) => (
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
