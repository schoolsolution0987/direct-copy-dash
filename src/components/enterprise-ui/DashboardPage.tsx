import { type ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardHeader } from "./DashboardHeader";

/**
 * The one and only dashboard page shell.
 * Same layout / header / sidebar / spacing for every module.
 */
export function DashboardPage({
  kicker,
  title,
  description,
  actions,
  children,
  bare = false,
}: {
  kicker?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  /** Render without the global shell (when already inside a shell). */
  bare?: boolean;
}) {
  const body = (
    <div className="space-y-6">
      <DashboardHeader
        kicker={kicker}
        title={title}
        description={description}
        actions={actions}
      />
      {children}
    </div>
  );

  if (bare) return body;
  return <AppShell>{body}</AppShell>;
}
