import { type ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "No records",
  description = "There is no data for this view yet.",
  icon,
  action,
  className,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-testid="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="grid h-14 w-14 place-items-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <div>
        <div className="text-base font-semibold">{title}</div>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
