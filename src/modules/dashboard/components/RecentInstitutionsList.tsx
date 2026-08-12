import React from "react";
import { Institution } from "../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { normalizeImageUrl } from "@/lib/utils";

interface RecentInstitutionsListProps {
  institutions: Institution[];
}

export const RecentInstitutionsList: React.FC<RecentInstitutionsListProps> = ({
  institutions,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden" data-testid="recent-institutions">
      <div className="flex items-center justify-between border-b border-border px-6 py-5 bg-muted/30">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">Recent Institutions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage and monitor latest onboarding</p>
        </div>
        <button 
          onClick={() => navigate(ROUTES.INSTITUTION)}
          className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold text-primary hover:bg-muted transition-colors"
        >
          View All
        </button>
      </div>
      <div className="divide-y divide-border">
        {institutions.map((institution) => (
          <div 
            key={institution.id} 
            onClick={() => navigate(`${ROUTES.INSTITUTION}`)}
            className="group flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 flex-shrink-0 rounded-2xl border border-border bg-background p-1.5 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                  {institution.logo ? (
                    <img
                      src={normalizeImageUrl(institution.logo)}
                      alt={institution.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold text-sm">
                      {institution.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-background ${
                  institution.status === "ACTIVE" ? "bg-success" : institution.status === "PENDING" ? "bg-warning" : "bg-destructive"
                }`} title={institution.status} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{institution.name}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                  <div className="flex items-center gap-1">
                    <span className="capitalize">
                      {institution.location?.city ?? "Unknown city"}, {institution.location?.country ?? "Unknown country"}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{new Date(institution.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end gap-1">
                <div className="flex items-center gap-3">
                   <div className="text-center px-3 py-1 bg-muted rounded-lg">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Courses</p>
                      <p className="text-xs font-bold text-foreground">{institution._count.courses}</p>
                   </div>
                   <div className="text-center px-3 py-1 bg-muted rounded-lg">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Members</p>
                      <p className="text-xs font-bold text-foreground">{institution._count.members}</p>
                   </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-8">
                  <div className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors group-hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
