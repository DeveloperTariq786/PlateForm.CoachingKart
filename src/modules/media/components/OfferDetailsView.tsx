import { Offer } from "../types/offer.types";
import { Tag, Percent, Clock, CalendarDays, Building2, FileText } from "lucide-react";
import { format } from "date-fns";

interface OfferDetailsViewProps {
    offer: Offer;
    formatCountdown: (seconds: number) => string;
    countdown: number;
}

export function OfferDetailsView({ offer, formatCountdown, countdown }: OfferDetailsViewProps) {
    const formatDateForDisplay = (isoDate: string) => {
        if (!isoDate) return "—";
        return format(new Date(isoDate), "MMM dd, yyyy");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <InfoItem
                icon={<Tag className="h-4 w-4" />}
                label="Title"
                value={offer.title}
            />
            <InfoItem
                icon={<Percent className="h-4 w-4" />}
                label="Discount"
                value={`${offer.discount}%`}
                highlight
            />
            <InfoItem
                icon={<Clock className="h-4 w-4" />}
                label="Remaining"
                value={formatCountdown(countdown)}
            />
            <InfoItem
                icon={<CalendarDays className="h-4 w-4" />}
                label="Start Date"
                value={formatDateForDisplay(offer.startAt)}
            />
            <InfoItem
                icon={<CalendarDays className="h-4 w-4" />}
                label="End Date"
                value={formatDateForDisplay(offer.endAt)}
            />
            <InfoItem
                icon={<Building2 className="h-4 w-4" />}
                label="Institution"
                value={offer.institution.name}
            />
            <div className="md:col-span-2 lg:col-span-3">
                <InfoItem
                    icon={<FileText className="h-4 w-4" />}
                    label="Description"
                    value={offer.description}
                />
            </div>
        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
    highlight,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="group rounded-xl border border-border bg-muted/20 px-4 py-3.5 transition-colors hover:bg-muted/40">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
            </div>
            <p className={`mt-1.5 text-sm font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>
                {value}
            </p>
        </div>
    );
}
