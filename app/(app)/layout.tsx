"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavbar } from "@/components/top-navbar";
import RequireAuth from "@/components/auth/RequireAuth";
import Providers from "./providers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopNavbar />
          <Providers>{children}</Providers>
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
