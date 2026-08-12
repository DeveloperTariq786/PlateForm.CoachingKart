import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DashboardStat } from "../types";

interface StatsCardsProps {
  stats: DashboardStat[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="stats-grid">
      {stats.map((stat) => (
        <div
          key={stat.title}
          data-testid={`stat-${stat.title.toLowerCase()}`}
          className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-lg"
        >
          {/* Left: Icon and Name */}
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.color} shadow-sm transition-transform group-hover:scale-105`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</h3>
            </div>
          </div>
          
          {/* Right: Value */}
          <div className="flex flex-col items-end gap-1">
            <p className="font-heading text-xl font-bold tracking-tight text-foreground">
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </p>
            {stat.change && (
              <div className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                stat.changeType === "up" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}>
                {stat.changeType === "up" ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                {stat.change}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
