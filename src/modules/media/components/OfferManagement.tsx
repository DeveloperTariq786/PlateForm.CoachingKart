import { useState, useEffect } from "react";
import { useOffer } from "@/modules/media/hooks/useOffer";
import { offerService } from "@/modules/media/services/offer.service";
import { UpdateOfferRequest } from "@/modules/media/types/offer.types";
import { useInstitutions } from "@/modules/institutions/hooks/useInstitutions";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    RefreshCw,
    Pencil,
    Save,
    X,
    Tag,
    ToggleRight,
} from "lucide-react";
import { OfferDetailsView } from "./OfferDetailsView";
import { OfferEditForm } from "./OfferEditForm";

export function OfferManagement() {
    const { offer, isLoading, refresh } = useOffer();
    const { institutions, isLoading: institutionsLoading } = useInstitutions();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<UpdateOfferRequest>({
        title: "",
        description: "",
        discount: 0,
        startAt: "",
        endAt: "",
        isActive: false,
        institutionId: "",
    });

    const [countdown, setCountdown] = useState<number>(0);

    // Sync form and countdown when offer loads or changes
    useEffect(() => {
        if (offer) {
            setFormData({
                title: offer.title,
                description: offer.description,
                discount: offer.discount,
                startAt: offer.startAt,
                endAt: offer.endAt,
                isActive: offer.isActive,
                institutionId: offer.institutionId,
            });
            setCountdown(offer.remainingSeconds);
        }
    }, [offer]);

    // Live countdown effect
    useEffect(() => {
        if (!offer || !offer.isActive || countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [offer, countdown]);

    const formatCountdown = (seconds: number) => {
        if (seconds <= 0) return "Expired";
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0 || days > 0) parts.push(`${hours}h`);
        if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
        parts.push(`${secs}s`);

        return parts.join(" ");
    };

    const handleCancel = () => {
        if (offer) {
            setFormData({
                title: offer.title,
                description: offer.description,
                discount: offer.discount,
                startAt: offer.startAt,
                endAt: offer.endAt,
                isActive: offer.isActive,
                institutionId: offer.institutionId,
            });
        }
        setIsEditing(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await offerService.updateOffer(formData);
            if (response.success) {
                toast.success(response.message || "Offer updated successfully");
                setIsEditing(false);
                refresh();
            } else {
                toast.error(response.message || "Failed to update offer");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred";
            toast.error(errorMessage);
            console.error("Update offer error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const formatDateForDisplay = (isoDate: string) => {
        if (!isoDate) return "—";
        return format(new Date(isoDate), "MMM dd, yyyy");
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="mt-2 h-4 w-56" />
                    </div>
                    <Skeleton className="h-9 w-24" />
                </div>
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="offers-title">
                            Offers
                        </h1>
                        <p className="text-sm text-muted-foreground">Manage offers and deals</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={refresh}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                        <Tag className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-foreground">No active offer</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        There is no offer configured yet. Create one from the backend to get started.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-foreground" data-testid="offers-title">
                        Offers
                    </h1>
                    <p className="text-sm text-muted-foreground">Manage offers and deals</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={refresh}
                        disabled={isLoading}
                        data-testid="offers-refresh-btn"
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    {!isEditing && (
                        <Button
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            data-testid="offers-edit-btn"
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Offer
                        </Button>
                    )}
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center justify-between rounded-xl border px-5 py-4 ${offer.isActive
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-950/30"
                : "border-border bg-muted/30"
                }`}>
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${offer.isActive
                        ? "bg-emerald-100 dark:bg-emerald-900/50"
                        : "bg-muted"
                        }`}>
                        <ToggleRight className={`h-5 w-5 ${offer.isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-muted-foreground"
                            }`} />
                    </div>
                    <div>
                        <p className={`text-sm font-semibold ${offer.isActive
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-muted-foreground"
                            }`}>
                            {offer.isActive ? "Offer is Active" : "Offer is Inactive"}
                        </p>
                        <p className={`text-xs ${offer.isActive
                            ? "text-emerald-600/80 dark:text-emerald-400/70"
                            : "text-muted-foreground/70"
                            }`}>
                            {offer.isActive
                                ? `Remaining: ${formatCountdown(countdown)}`
                                : "This offer is currently disabled"}
                        </p>
                    </div>
                </div>
                <Badge
                    variant={offer.isActive ? "default" : "secondary"}
                    className={offer.isActive
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : ""
                    }
                >
                    {offer.isActive ? "Active" : "Inactive"}
                </Badge>
            </div>

            {/* Offer Card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-8 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Tag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                {isEditing ? "Edit Offer" : offer.title}
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Last updated: {formatDateForDisplay(offer.updatedAt)}
                            </p>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                <X className="mr-1.5 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSave}
                                disabled={isSaving}
                                data-testid="offers-save-btn"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-1.5 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="px-8 py-6">
                    {isEditing ? (
                        <OfferEditForm
                            formData={formData}
                            setFormData={setFormData}
                            institutions={institutions}
                            institutionsLoading={institutionsLoading}
                        />
                    ) : (
                        <OfferDetailsView
                            offer={offer}
                            formatCountdown={formatCountdown}
                            countdown={countdown}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
