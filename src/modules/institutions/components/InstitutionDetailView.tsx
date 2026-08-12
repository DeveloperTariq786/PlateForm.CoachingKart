import { InstitutionDetail } from "../types/institution.types";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Info
} from "lucide-react";
import { format } from "date-fns";

interface InstitutionDetailViewProps {
    institution: InstitutionDetail;
}

export function InstitutionDetailView({ institution }: InstitutionDetailViewProps) {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column: About & Programs */}
            <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <h3 className="mb-6 font-heading text-xl font-bold text-foreground flex items-center gap-2">
                        <Info className="h-5.5 w-5.5 text-primary" /> Institution Overview
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{institution.description || "No description provided."}</p>
                </div>

                {/* Programs Section */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h3 className="font-heading text-lg font-bold text-foreground">Active Programs</h3>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{institution._count.courses} Courses</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {institution.courses?.map((course) => (
                            <span
                                key={course.id}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 bg-muted/30 text-sm font-medium text-foreground transition-all hover:bg-primary/5 hover:border-primary/30 hover:shadow-sm"
                            >
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                {course.name}
                            </span>
                        ))}
                        {institution.courses?.length === 0 && (
                            <div className="w-full flex h-24 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-muted/20">
                                <p className="text-sm text-muted-foreground italic">No programs assigned to this institution yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Contact & Meta */}
            <div className="space-y-8">
                {/* Contact Details */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                    <h3 className="font-heading text-lg font-bold text-foreground border-b border-border pb-4">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Mail className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</p>
                                <p className="text-sm font-semibold text-foreground break-all">{institution.tuitionEmail}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                                <Phone className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</p>
                                <p className="text-sm font-semibold text-foreground">{institution.tuitionPhone}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">
                                <MapPin className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</p>
                                <p className="text-sm font-semibold text-foreground leading-snug">
                                    {institution.location?.address ?? "Unknown address"}, {institution.location?.city ?? "Unknown city"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registration Info */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                    <h3 className="font-heading text-lg font-bold text-foreground border-b border-border pb-4">System Data</h3>
                    <div className="space-y-5">

                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Since</span>
                            <span className="text-sm font-bold text-foreground">{format(new Date(institution.createdAt), "MMM yyyy")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Update</span>
                            <span className="text-sm font-bold text-foreground">{format(new Date(institution.updatedAt), "MMM dd, HH:mm")}</span>
                        </div>
                        <div className="pt-4 border-t border-border/50">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground opacity-70">
                                <Calendar className="h-3 w-3" />
                                AUTO-SYNCED WITH PLATFORM DB
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
