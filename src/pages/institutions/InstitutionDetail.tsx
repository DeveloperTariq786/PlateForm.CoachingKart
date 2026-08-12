import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Info,
  Ban,
  CheckCircle,
} from "lucide-react";
import { useInstitution } from "@/modules/institutions/hooks/useInstitution";
import { Skeleton } from "@/components/ui/skeleton";
import { InstitutionDetailView } from "@/modules/institutions/components/InstitutionDetailView";
import { useInstitutionStore } from "@/modules/institutions/store/institution.store";
import { institutionService } from "@/modules/institutions/services/institution.service";
import { normalizeImageUrl } from "@/lib/utils";
import { toast } from "sonner";

export default function InstitutionDetail() {
  const { selectedInstitutionId, setSelectedInstitutionId } = useInstitutionStore();
  const { institution, isLoading, refresh } = useInstitution(selectedInstitutionId || undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = async (action: 'suspend' | 'reactivate') => {
    if (!institution) return;
    setIsSubmitting(true);
    try {
      if (action === 'suspend') {
        await institutionService.suspendInstitution(institution.id);
        toast.success("Institution suspended successfully");
      } else {
        await institutionService.reactivateInstitution(institution.id);
        toast.success("Institution reactivated successfully");
      }
      refresh();
    } catch (error) {
      toast.error(`Failed to ${action} institution`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 w-full rounded-2xl bg-muted" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Info className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Institution not found</h3>
          <p className="text-sm text-muted-foreground">The requested institution does not exist or has been removed.</p>
        </div>
        <button
          onClick={() => setSelectedInstitutionId(null)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to Institutions
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Cover Image & Basic Header */}
      <div className="mb-8 relative">
        <div className="relative h-56 w-full overflow-hidden rounded-2xl">
          {institution.coverImage ? (
            <img src={normalizeImageUrl(institution.coverImage)} alt="Cover" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-primary/10 to-primary/5" />
          )}
          <button
            onClick={() => setSelectedInstitutionId(null)}
            className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-background"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 -mt-12 px-8 flex items-end justify-between gap-6">
          <div className="flex items-end gap-6">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-4 border-background bg-card shadow-xl overflow-hidden">
              {institution.logo ? (
                <img src={normalizeImageUrl(institution.logo)} alt={institution.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-primary">{institution.name.charAt(0)}</span>
              )}
            </div>
          </div>
          <div className="flex gap-3 mb-2">
            {institution.status === 'ACTIVE' && (
              <button
                onClick={() => handleAction('suspend')}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
              >
                <Ban className="h-4 w-4" />
                Suspend
              </button>
            )}
            {institution.status === 'SUSPENDED' && (
              <button
                onClick={() => handleAction('reactivate')}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-2 text-sm font-medium text-success transition-colors hover:bg-success hover:text-success-foreground disabled:opacity-50"
              >
                <CheckCircle className="h-4 w-4" />
                Reactivate
              </button>
            )}
          </div>
        </div>

        <div className="px-8 mt-4">
          <h1 className="font-heading text-3xl font-bold text-foreground leading-tight">{institution.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${institution.status === "ACTIVE" ? "bg-success/10 text-success" : institution.status === "PENDING_APPROVAL" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
              }`}>
              {institution.status.replace("_", " ")}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {institution.location?.city ?? "Unknown city"}, {institution.location?.country ?? "Unknown country"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <InstitutionDetailView institution={institution} />
    </div>
  );
}
