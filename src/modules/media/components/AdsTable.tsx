import { DataTable, TableColumn } from "@/components/common/DataTable";
import { Ad } from "../types/ads.types";
import { normalizeImageUrl } from "@/lib/utils";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface AdsTableProps {
    data: Ad[];
    isLoading?: boolean;
}

function AdsTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border bg-muted/50">
                        {["Image", "Button Text", "Institution", "Created At"].map((label, i) => (
                            <th key={i} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {[...Array(4)].map((_, i) => (
                        <tr key={i}>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-12 w-20 rounded-lg" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-24" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-32" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-24" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function AdsTable({ data, isLoading }: AdsTableProps) {
    const columns: TableColumn<Ad>[] = [
        {
            key: "image",
            label: "Image",
            render: (value, row) => (
                <div className="h-12 w-20 overflow-hidden rounded-lg border border-border">
                    <img
                        src={normalizeImageUrl(value as string)}
                        alt="Ad Banner"
                        className="h-full w-full object-cover"
                    />
                </div>
            ),
        },
        {
            key: "buttonText",
            label: "Button Text",
            render: (value) => (
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {value as string}
                </span>
            ),
        },
        {
            key: "institution",
            label: "Institution",
            render: (_, row) => (
                <p className="text-sm font-medium text-foreground">{row.institution.name}</p>
            ),
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (value) => (
                <p className="text-sm text-muted-foreground">
                    {format(new Date(value as string), "MMM dd, yyyy")}
                </p>
            ),
        },
    ];

    if (isLoading) {
        return <AdsTableSkeleton />;
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center rounded-xl border border-border bg-card p-12">
                <p className="text-sm text-muted-foreground">No advertisements found</p>
            </div>
        );
    }

    return (
        <DataTable<Ad>
            columns={columns}
            data={data}
            testId="ads-table"
            rowTestIdPrefix="ad-row"
        />
    );
}
