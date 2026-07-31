import { type ReactNode } from "react";
import { DashboardPage } from "./DashboardPage";
import { KpiRow, type KpiItem } from "./Kpi";
import { QuickActionBar, type QuickAction } from "./QuickActionBar";

/**
 * Config-driven module dashboard.
 * ANY new module (Boss, CEO, Vendor, Finance, CRM, …) gets the identical
 * enterprise dashboard by supplying a config — no redesign, no new styling.
 * Only kpis / quickActions / widgets (data) differ per module.
 */
export interface ModuleDashboardConfig {
  kicker?: string;
  title: string;
  description?: string;
  /** KPIs sourced from database/API only. Missing values render "—". */
  kpis?: KpiItem[];
  quickActions?: QuickAction[];
  headerActions?: ReactNode;
  loading?: boolean;
  /** Charts / tables / widgets built from the shared library. */
  children?: ReactNode;
  bare?: boolean;
}

export function ModuleDashboard({
  kicker,
  title,
  description,
  kpis = [],
  quickActions = [],
  headerActions,
  loading,
  children,
  bare,
}: ModuleDashboardConfig) {
  return (
    <DashboardPage
      kicker={kicker}
      title={title}
      description={description}
      actions={headerActions}
      bare={bare}
    >
      {quickActions.length > 0 && <QuickActionBar actions={quickActions} />}
      {kpis.length > 0 && <KpiRow items={kpis} loading={loading} />}
      {children}
    </DashboardPage>
  );
}
