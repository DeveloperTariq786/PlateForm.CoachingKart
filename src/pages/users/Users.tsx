import { Mail, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/modules/users/services/users.service";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const roleColors: Record<string, string> = {
  "PLATFORM_SUPER_ADMIN": "bg-primary/10 text-primary",
  "PLATFORM_ADMIN": "bg-success/10 text-success",
};

function UsersSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-2 w-2 rounded-full" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UsersPage() {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["platform-users"],
    queryFn: () => userService.getAllUsers(),
  });

  const users = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="users-title">
            Platform Admins
          </h1>
          <p className="text-sm text-muted-foreground">Manage platform administrators and roles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:bg-accent disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin")} />
          </button>
          <button
            onClick={() => navigate(ROUTES.ADMINS_ADD)}
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" /> Add Admin
          </button>
        </div>
      </div>

      {isLoading ? (
        <UsersSkeleton />
      ) : error ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-sm font-medium text-destructive">Failed to load users</p>
          <p className="mt-1 text-xs text-muted-foreground">{(error as any).message || "An unexpected error occurred"}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-destructive px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-destructive/90"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="users-grid">
          {users.map((user) => (
            <div
              key={user.id}
              data-testid={`user-card-${user.id}`}
              className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                    {user.name?.[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
                <span
                  className={`h-2 w-2 rounded-full ${user.isActive ? "bg-success" : "bg-muted-foreground"
                    }`}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${roleColors[user.platformRole] || "bg-muted text-muted-foreground"}`}>
                  {user.platformRole.replace("PLATFORM_", "").replace("_", " ")}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
