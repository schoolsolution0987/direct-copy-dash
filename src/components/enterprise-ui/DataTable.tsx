import { type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionCard } from "./SectionCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

/**
 * The one table used everywhere. Rows must come from the database/API.
 */
export function DataTable<T extends Record<string, any>>({
  title,
  description,
  actions,
  columns,
  rows,
  loading,
  rowKey,
  onRowClick,
  emptyTitle = "No records",
  emptyDescription = "There is nothing to show here yet.",
  emptyAction,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  columns: DataTableColumn<T>[];
  rows: T[] | null | undefined;
  loading?: boolean;
  rowKey?: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}) {
  const list = rows ?? [];

  return (
    <SectionCard title={title} description={description} actions={actions} padded={false}>
      {loading ? (
        <div className="p-5" data-testid="data-table-loading">
          <LoadingState />
        </div>
      ) : list.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      ) : (
        <div className="overflow-x-auto" data-testid="data-table">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={c.key} className={c.className}>
                    {c.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((row, i) => (
                <TableRow
                  data-testid="data-table-row"
                  key={rowKey ? rowKey(row, i) : (row.id ?? i)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {columns.map((c) => (
                    <TableCell key={c.key} className={c.className}>
                      {c.render ? c.render(row) : (row[c.key] ?? "—")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </SectionCard>
  );
}
