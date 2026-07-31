import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type KpiTone = "brand" | "success" | "warning" | "danger" | "neutral";

export interface KpiItem {
  key: string;
  label: string;
  /** Real value from database/API. `null`/`undefined` renders "—" (never invent numbers). */
  value?: number | string | null;
  unit?: string;
  /** Percentage delta from real data; omit when unknown. */
  delta?: number | null;
  icon?: LucideIcon;
  tone?: KpiTone;
  onClick?: () => void;
}

const TONE: Record<KpiTone, string> = {
  brand: "bg-primary/15 text-primary",
  success: "bg-emerald-500/15 text-emerald-500",
  warning: "bg-amber-500/15 text-amber-500",
  danger: "bg-destructive/15 text-destructive",
  neutral: "bg-muted text-muted-foreground",
};

export function KpiCard({ item, loading }: { item: KpiItem; loading?: boolean }) {
  const Icon = item.icon;
  const tone = TONE[item.tone ?? "brand"];
  const hasValue = item.value !== null && item.value !== undefined && item.value !== "";
  const Delta =
    item.delta == null ? Minus : item.delta > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <button
      type="button"
      onClick={item.onClick}
      disabled={!item.onClick}
      className={cn(
        "group rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all",
        item.onClick && "hover:-translate-y-0.5 hover:border-primary/50",
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("grid h-9 w-9 place-items-center rounded-xl", tone)}>
          {Icon && <Icon className="h-4 w-4" />}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        {loading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <>
            <span
              className={cn(
                "text-2xl font-black tracking-tight",
                hasValue ? "text-foreground" : "text-foreground/40",
              )}
            >
              {hasValue ? item.value : "—"}
            </span>
            {item.unit && hasValue && (
              <span className="text-sm font-bold text-muted-foreground">{item.unit}</span>
            )}
          </>
        )}
      </div>

      <div className="mt-0.5 flex items-center justify-between gap-2">
        <div className="truncate text-xs text-muted-foreground">{item.label}</div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-[10px] font-medium",
            item.delta == null
              ? "text-muted-foreground"
              : item.delta > 0
                ? "text-emerald-500"
                : "text-destructive",
          )}
        >
          <Delta className="h-3 w-3" />
          {item.delta == null ? "no data" : `${Math.abs(item.delta)}%`}
        </span>
      </div>
    </button>
  );
}

export function KpiRow({ items, loading }: { items: KpiItem[]; loading?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
      {items.map((item) => (
        <KpiCard key={item.key} item={item} loading={loading} />
      ))}
    </div>
  );
}
