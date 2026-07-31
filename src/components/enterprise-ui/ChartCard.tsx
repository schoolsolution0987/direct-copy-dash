import { type ReactNode } from "react";
import { SectionCard } from "./SectionCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

/**
 * Charts must be fed real database rows. When `data` is empty we render a
 * professional empty state instead of inventing values.
 */
export function ChartCard({
  title,
  description,
  actions,
  data,
  loading,
  children,
  emptyTitle = "No chart data",
  emptyDescription = "Data will appear here once records exist.",
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  data: unknown[] | null | undefined;
  loading?: boolean;
  children: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const isEmpty = !data || data.length === 0;
  return (
    <SectionCard title={title} description={description} actions={actions}>
      {loading ? (
        <LoadingState rows={4} />
      ) : isEmpty ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="h-[280px] w-full">{children}</div>
      )}
    </SectionCard>
  );
}
