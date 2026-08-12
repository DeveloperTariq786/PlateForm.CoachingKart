import { ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T extends { id: string | number }> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  testId?: string;
  rowTestIdPrefix?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  testId = "data-table",
  rowTestIdPrefix = "row",
}: DataTableProps<T>) {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      default:
        return "text-left";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" data-testid={testId}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-5 py-3 ${getAlignClass(column.align)} text-xs font-semibold uppercase tracking-wider text-muted-foreground`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr
              key={row.id}
              data-testid={`${rowTestIdPrefix}-${row.id}`}
              className={`transition-colors hover:bg-muted/30 ${onRowClick ? "cursor-pointer" : ""}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`px-5 py-3.5 text-sm text-foreground ${getAlignClass(column.align)}`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
