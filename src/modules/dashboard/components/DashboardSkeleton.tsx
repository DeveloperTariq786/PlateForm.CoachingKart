import React from "react";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-lg bg-muted-foreground/10" />
        <div className="h-4 w-64 rounded-md bg-muted-foreground/10" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-xl bg-muted-foreground/10" />
              <div className="h-6 w-16 rounded-full bg-muted-foreground/10" />
            </div>
            <div className="mt-4 space-y-2">
               <div className="h-4 w-24 rounded bg-muted-foreground/10" />
               <div className="h-8 w-16 rounded-md bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Institutions Skeleton */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-5 bg-muted/30">
          <div className="space-y-1">
            <div className="h-6 w-40 rounded bg-muted-foreground/10" />
            <div className="h-3 w-56 rounded bg-muted-foreground/10" />
          </div>
          <div className="h-8 w-24 rounded-lg bg-muted-foreground/10" />
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-muted-foreground/10" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 rounded bg-muted-foreground/20" />
                  <div className="h-3 w-48 rounded bg-muted-foreground/10" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-3">
                  <div className="h-10 w-20 rounded-lg bg-muted-foreground/5" />
                  <div className="h-10 w-20 rounded-lg bg-muted-foreground/5" />
                </div>
                <div className="h-8 w-8 rounded-lg bg-muted-foreground/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
