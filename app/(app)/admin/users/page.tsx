"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api/client";
import { ChevronUp, ChevronDown, UserCog } from "lucide-react";
import { CreateUserModal } from "@/components/admin/CreateUserModal";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface User {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

interface PaginationMeta {
  page: number; // 0-based
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

type RoleFilter = "" | "USER" | "ADMIN";
type SortField = "id" | "email" | "createdAt";
type SortDirection = "asc" | "desc";

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [togglingStatusId, setTogglingStatusId] = useState<number | null>(null);

  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const [togglingId, setTogglingId] = useState<number | null>(null);

  const accessToken = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;

  const fetchUsers = useCallback(async () => {
    setIsFiltering(true);
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: "10",
        sort: `${sortBy},${sortDir}`,
      });

      if (roleFilter) {
        params.append("role", roleFilter);
      }

      const query = params.toString();
      const path = `/api/admin/users${query ? `?${query}` : ""}`;

      const result = await api<{
        success: boolean;
        data: {
          data: User[];
        } & PaginationMeta;
        message?: string;
      }>(path, { method: "GET" }, accessToken);

      if (result.success && result.data) {
        setUsers(result.data.data);
        setMeta({
          page: result.data.page,
          size: result.data.size,
          totalElements: result.data.totalElements,
          totalPages: result.data.totalPages,
          last: result.data.last,
        });
      } else {
        setError(result.message || "Failed to load users");
      }
    } catch (err: any) {
      setError(err.message || "Network error while fetching users");
      console.error("Fetch users failed:", err);
    } finally {
      // setLoading(false);
      setIsFiltering(false);
    }
  }, [page, roleFilter, sortBy, sortDir, accessToken]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset page when filter or sort changes
  useEffect(() => {
    setPage(0);
  }, [roleFilter, sortBy, sortDir]);

  //===================== Toggle User Status =====================
  const toggleUserStatus = async (user: User) => {
    const userId = user.id;
    const originalStatus = user.isActive;

    // Optimistic update
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !originalStatus } : u)),
    );

    setTogglingStatusId(userId);

    try {
      // PATCH request – assuming server toggles without body
      // If server expects body like { active: boolean }, add it: { body: JSON.stringify({ active: !originalStatus }) }
      await api(
        `/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
        },
        accessToken,
      );

      // Success → keep the optimistic change
    } catch (err: any) {
      // Rollback on error
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isActive: originalStatus } : u)),
      );

      setError(`Failed to toggle status for ${user.email}`);
      console.error("Toggle status failed:", err);
    } finally {
      setTogglingStatusId(null);
    }
  };

  //===================== Toggle User Role =====================
  const toggleUserRole = async (user: User) => {
    const userId = user.id;
    const originalRole = user.role;

    // Optimistic update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: originalRole === "ADMIN" ? "USER" : "ADMIN" } : u,
      ),
    );

    setTogglingId(userId);

    try {
      await api(
        `/api/admin/users/${userId}/role`,
        {
          method: "PATCH",
        },
        accessToken,
      );

      // Success → keep optimistic change
    } catch (err: any) {
      // Rollback
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: originalRole } : u)));

      setError(`Failed to toggle role for ${user.email}`);
      console.error("Toggle role failed:", err);
    } finally {
      setTogglingId(null);
    }
  };

  //===================== Sort =====================
  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  const getSortIcon = (field: SortField) =>
    sortBy === field ? (
      sortDir === "asc" ? (
        <ChevronUp className="ml-1 inline h-4 w-4" />
      ) : (
        <ChevronDown className="ml-1 inline h-4 w-4" />
      )
    ) : null;

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || (meta && newPage >= meta.totalPages)) return;
    setPage(newPage);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getPageNumbers = () => {
    if (!meta) return [];
    const total = meta.totalPages;
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);

    const pages: number[] = [0];
    const start = Math.max(1, page - 1);
    const end = Math.min(total - 2, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 2) pages.push(-1); // ellipsis
    if (total > 1) pages.push(total - 1);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="role-filter" className="text-sm font-medium text-gray-700">
            Filter by role:
          </label>
          <select
            id="role-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-w-[140px]"
          >
            <option value="">All </option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>

          {/* <Button onClick={handleCreateUser}>CREATE USER</Button> */}
          <CreateUserModal onUserCreated={fetchUsers} />

          {roleFilter && (
            <Button variant="outline" size="sm" onClick={() => setRoleFilter("")}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Overlay loader – only when filtering/re-sorting */}
      {isFiltering && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p className="text-sm text-gray-600">Loading users...</p>
          </div>
        </div>
      )}

      {/* {loading && (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      )} */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-5 text-red-700 border border-red-200">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="rounded-lg bg-gray-50 p-10 text-center text-gray-600 shadow-sm">
          No users found {roleFilter ? `for role "${roleFilter}"` : "in the system"}.
        </div>
      )}

      {users.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="cursor-pointer px-6 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => toggleSort("id")}
                  >
                    ID {getSortIcon("id")}
                  </th>
                  <th
                    className="cursor-pointer px-6 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => toggleSort("email")}
                  >
                    Email {getSortIcon("email")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th
                    className="cursor-pointer px-6 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => toggleSort("createdAt")}
                  >
                    Created {getSortIcon("createdAt")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => {
                  const isToggling = togglingId === user.id;
                  const nextRoleLabel = user.role === "ADMIN" ? "Make User" : "Make Admin";

                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                            user.role === "ADMIN"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800",
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                            user.isActive
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800",
                          )}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm flex items-center gap-3">
                        {/* Role Toggle */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserRole(user)}
                          disabled={togglingId === user.id || togglingStatusId === user.id}
                          className="min-w-[140px] gap-1.5"
                        >
                          {togglingId === user.id ? (
                            <>
                              <UserCog className="h-4 w-4 animate-spin" />
                              Updating…
                            </>
                          ) : (
                            <>
                              <UserCog className="h-4 w-4" />
                              {user.role === "ADMIN" ? "Make User" : "Make Admin"}
                            </>
                          )}
                        </Button>

                        {/* Status Toggle */}
                        <Button
                          variant={user.isActive ? "destructive" : "secondary"}
                          size="sm"
                          onClick={() => toggleUserStatus(user)}
                          disabled={togglingStatusId === user.id || togglingId === user.id}
                          className="min-w-[110px]"
                        >
                          {togglingStatusId === user.id ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Updating…
                            </>
                          ) : user.isActive ? (
                            "Deactivate"
                          ) : (
                            "Activate"
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {meta && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={cn(page === 0 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>

                  {pageNumbers.map((p, idx) => (
                    <PaginationItem key={idx}>
                      {p === -1 ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={p === page}
                          onClick={() => handlePageChange(p)}
                          className="cursor-pointer"
                        >
                          {p + 1}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={cn(meta.last && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="mt-3 text-center text-sm text-gray-600">
                Showing <strong>{users.length}</strong> of <strong>{meta.totalElements}</strong>{" "}
                users
                {" • "} Page <strong>{page + 1}</strong> of <strong>{meta.totalPages}</strong>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
