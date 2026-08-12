import { DataTable, TableColumn } from "@/components/common/DataTable";
import { Carousel } from "../types/carousel.types";
import { normalizeImageUrl } from "@/lib/utils";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface CarouselTableProps {
    data: Carousel[];
    isLoading?: boolean;
}

function CarouselTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border bg-muted/50">
                        {["Image", "Title", "Description", "Button Text", "Institution", "Created At"].map((label, i) => (
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
                                <Skeleton className="h-4 w-28" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-40" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-28" />
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

export function CarouselTable({ data, isLoading }: CarouselTableProps) {
    const columns: TableColumn<Carousel>[] = [
        {
            key: "image",
            label: "Image",
            render: (value, row) => (
                <div className="h-12 w-20 overflow-hidden rounded-lg border border-border">
                    <img
                        src={normalizeImageUrl(value as string)}
                        alt={row.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            ),
        },
        {
            key: "title",
            label: "Title",
            render: (value) => (
                <p className="text-sm font-medium text-foreground">{value as string}</p>
            ),
        },
        {
            key: "description",
            label: "Description",
            render: (value) => (
                <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {value as string}
                </p>
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
        return <CarouselTableSkeleton />;
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center rounded-xl border border-border bg-card p-12">
                <p className="text-sm text-muted-foreground">No carousel items found</p>
            </div>
        );
    }

    return (
        <DataTable<Carousel>
            columns={columns}
            data={data}
            testId="carousel-table"
            rowTestIdPrefix="carousel-row"
        />
    );
}
