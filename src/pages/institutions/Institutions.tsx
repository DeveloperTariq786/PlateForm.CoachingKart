import { useState } from "react";
import { Search } from "lucide-react";
import { InstitutionTable } from "@/modules/institutions/components/InstitutionTable";
import { useInstitutions } from "@/modules/institutions/hooks/useInstitutions";
import { InstitutionStatus } from "@/modules/institutions/types/institution.types";
import { useInstitutionStore } from "@/modules/institutions/store/institution.store";
import InstitutionDetail from "./InstitutionDetail";

export default function Institutions() {
  const [search, setSearch] = useState("");
  const { institutions, isLoading, status: statusFilter, setStatus } = useInstitutions("ACTIVE");
  const { selectedInstitutionId, setSelectedInstitutionId } = useInstitutionStore();

  if (selectedInstitutionId) {
    return <InstitutionDetail />;
  }

  const filtered = institutions.filter((inst) => {
    const matchSearch =
      inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.owner.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const statuses: (InstitutionStatus | "ALL")[] = ["ALL", "ACTIVE", "PENDING_APPROVAL", "REJECTED", "SUSPENDED"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="institutions-title">
            Institutions
          </h1>
          <p className="text-sm text-muted-foreground">Manage all registered institutions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3" data-testid="institutions-filters">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            data-testid="institutions-search"
            type="text"
            placeholder="Search institutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              data-testid={`filter-${s}`}
              onClick={() => setStatus(s === "ALL" ? undefined : s)}
              className={`h-9 rounded-lg px-3 text-sm font-medium capitalize transition-colors ${(s === "ALL" && !statusFilter) || statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
            >
              {s.replace('_', ' ').toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <InstitutionTable
        data={filtered}
        onView={(id) => setSelectedInstitutionId(id)}
        isLoading={isLoading}
      />
    </div>
  );
}

