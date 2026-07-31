import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div data-testid="loading-state" className="space-y-3 p-1">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-xl" />
      ))}
    </div>
  );
}
