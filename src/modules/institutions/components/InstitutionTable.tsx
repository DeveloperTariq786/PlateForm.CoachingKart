
import { DataTable, TableColumn } from "@/components/common/DataTable";
import { Institution } from "../types/institution.types";
import { normalizeImageUrl } from "@/lib/utils";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface InstitutionTableProps {
    data: Institution[];
    onView: (id: string) => void;
    isLoading?: boolean;
}

function InstitutionTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border bg-muted/50">
                        {["Institution", "Owner", "Created At", "Status"].map((label, i) => (
                            <th key={i} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {[...Array(5)].map((_, i) => (
                        <tr key={i}>
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-9 w-9 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-48" />
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-3.5">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-24" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export function InstitutionTable({ data, onView, isLoading }: InstitutionTableProps) {
    const columns: TableColumn<Institution>[] = [
        {
            key: "name",
            label: "Institution",
            render: (_, inst) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
                        {inst.logo ? (
                            <img src={normalizeImageUrl(inst.logo)} alt={inst.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-xs font-bold text-primary">
                                {inst.name.charAt(0)}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">{inst.name}</p>
                        <p className="text-xs text-muted-foreground">{inst.address}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "owner",
            label: "Owner",
            render: (_, inst) => (
                <div>
                    <p className="text-sm font-medium text-foreground">{inst.owner}</p>
                    <p className="text-xs text-muted-foreground">{inst.ownerEmail}</p>
                </div>
            ),
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (value) => format(new Date(value as string), 'MMM dd, yyyy'),
        },
        {
            key: "status",
            label: "Status",
            render: (value) => {
                const status = value as string;
                const statusColors: Record<string, string> = {
                    ACTIVE: "bg-success/10 text-success",
                    PENDING_APPROVAL: "bg-warning/10 text-warning",
                    REJECTED: "bg-destructive/10 text-destructive",
                    SUSPENDED: "bg-muted text-muted-foreground",
                };

                return (
                    <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[status] || "bg-muted text-muted-foreground"}`}
                    >
                        {status.replace('_', ' ').toLowerCase()}
                    </span>
                );
            },
        },
    ];

    if (isLoading) {
        return <InstitutionTableSkeleton />;
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center p-12">
                <p className="text-sm">No institutions found</p>
            </div>
        );
    }

    return (
        <DataTable<Institution>
            columns={columns}
            data={data}
            onRowClick={(inst) => onView(inst.id)}
            testId="institutions-table"
            rowTestIdPrefix="institution-row"
        />
    );
}
