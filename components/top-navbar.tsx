"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

export function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex flex-1 items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground md:text-base">Finance Manager</h2>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"} className="text-xs">
              {user?.role}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
