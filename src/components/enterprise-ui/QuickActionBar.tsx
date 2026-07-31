import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface QuickAction {
  key: string;
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
}

export function QuickActionBar({ actions }: { actions: QuickAction[] }) {
  if (!actions.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {actions.map((a) => (
        <Button
          key={a.key}
          size="sm"
          variant={a.variant ?? "secondary"}
          onClick={a.onClick}
          className="rounded-xl"
        >
          {a.icon && <a.icon className="mr-1.5 h-4 w-4" />}
          {a.label}
        </Button>
      ))}
    </div>
  );
}
